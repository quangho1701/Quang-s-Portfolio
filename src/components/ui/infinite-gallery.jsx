import React, { useRef, useMemo, useCallback, useState, useEffect, Suspense, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Error Boundary to catch WebGL crashes
class GalleryErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.warn('InfiniteGallery crashed:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{
					width: '100%', height: '100%',
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
					borderRadius: '1rem', color: '#666', fontSize: '1.1rem',
				}}>
					<p>Gallery could not be loaded.</p>
				</div>
			);
		}
		return this.props.children;
	}
}

// Seeded random for consistent layouts
function seededRandom(seed) {
	let s = seed;
	return function () {
		s = (s * 16807 + 0) % 2147483647;
		return (s - 1) / 2147483646;
	};
}

// Custom shader material
const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 },
			scrollForce: { value: 0.0 },
			time: { value: 0.0 },
			isHovered: { value: 0.0 },
		},
		vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        float curveIntensity = scrollForce * 0.08;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.01;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.008;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 6.0;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = sin(wavePhase) * 0.04 * dampening;
          flagWave += sin(pos.x * 5.0 + time * 10.0) * 0.015 * dampening;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
	});
};

function ImagePlane({ texture, position, scale, material }) {
	const meshRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (material && texture) {
			material.uniforms.map.value = texture;
		}
	}, [material, texture]);

	useEffect(() => {
		if (material && material.uniforms) {
			material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
		}
	}, [material, isHovered]);

	return (
		<mesh
			ref={meshRef}
			position={position}
			scale={scale}
			material={material}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<planeGeometry args={[1, 1, 32, 32]} />
		</mesh>
	);
}

function GalleryScene({
	images,
	speed = 1,
	visibleCount = 6,
}) {
	const scrollVelocityRef = useRef(0);
	const autoPlayRef = useRef(true);
	const lastInteraction = useRef(Date.now());
	const [, forceUpdate] = useState(0);

	const normalizedImages = useMemo(
		() => images.map((img) => typeof img === 'string' ? { src: img, alt: '' } : img),
		[images]
	);

	const textures = useTexture(normalizedImages.map((img) => img.src));

	const materials = useMemo(
		() => Array.from({ length: visibleCount }, () => createClothMaterial()),
		[visibleCount]
	);

	// Exhibition-style layout: each plane gets a unique position offset and size
	// Only ~3 are visible at once due to tight fade window
	const planeConfigs = useMemo(() => {
		const rng = seededRandom(123);
		const configs = [];

		// Alternating layout patterns for variety
		const patterns = [
			// Far left, mid-up
			{ x: -7, y: 3.5, size: 4.5 },
			// Far right, mid-down
			{ x: 7, y: -2.5, size: 3.2 },
			// Center, low
			{ x: 0.5, y: -4.5, size: 5.2 },
			// Mid-left, mid-down
			{ x: -5, y: -3.0, size: 3.8 },
			// Mid-right, high
			{ x: 5.5, y: 4.5, size: 4.2 },
			// Center-right, mid-up
			{ x: 2.5, y: 2.5, size: 3.5 },
		];

		for (let i = 0; i < visibleCount; i++) {
			const pattern = patterns[i % patterns.length];
			// Add slight randomness to avoid feeling too rigid
			const jitterX = (rng() - 0.5) * 2;
			const jitterY = (rng() - 0.5) * 1.5;
			configs.push({
				x: pattern.x + jitterX,
				y: pattern.y + jitterY,
				baseSize: pattern.size + (rng() - 0.5) * 3,
			});
		}
		return configs;
	}, [visibleCount]);

	const totalImages = normalizedImages.length;
	const depthRange = 40;
	// Tight spacing: only ~3 planes in the visible fade window at any time
	const zSpacing = depthRange / visibleCount;

	const planesData = useRef(
		Array.from({ length: visibleCount }, (_, i) => ({
			index: i,
			z: zSpacing * i,
			imageIndex: totalImages > 0 ? i % totalImages : 0,
		}))
	);

	useEffect(() => {
		const spacing = depthRange / visibleCount;
		planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
			index: i,
			z: spacing * i,
			imageIndex: totalImages > 0 ? i % totalImages : 0,
		}));
	}, [depthRange, totalImages, visibleCount]);

	const handleWheel = useCallback(
		(event) => {
			event.preventDefault();
			scrollVelocityRef.current += event.deltaY * 0.008 * speed;
			autoPlayRef.current = false;
			lastInteraction.current = Date.now();
		},
		[speed]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
				scrollVelocityRef.current -= 1.5 * speed;
				autoPlayRef.current = false;
				lastInteraction.current = Date.now();
			} else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
				scrollVelocityRef.current += 1.5 * speed;
				autoPlayRef.current = false;
				lastInteraction.current = Date.now();
			}
		},
		[speed]
	);

	useEffect(() => {
		const canvas = document.querySelector('canvas');
		if (canvas) {
			canvas.addEventListener('wheel', handleWheel, { passive: false });
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				canvas.removeEventListener('wheel', handleWheel);
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [handleWheel, handleKeyDown]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (Date.now() - lastInteraction.current > 3000) {
				autoPlayRef.current = true;
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// Fade settings: tight window so only ~3 images visible
	const fadeIn = { start: 0.15, end: 0.30 };
	const fadeOut = { start: 0.55, end: 0.70 };
	const blurIn = { start: 0.10, end: 0.25 };
	const blurOut = { start: 0.60, end: 0.75 };
	const maxBlur = 5.0;

	useFrame((state, delta) => {
		// Auto-play: gentle forward drift
		if (autoPlayRef.current) {
			scrollVelocityRef.current += 0.2 * delta;
		}
		// Smooth damping
		scrollVelocityRef.current *= 0.96;

		const time = state.clock.getElapsedTime();
		materials.forEach((mat) => {
			if (mat && mat.uniforms) {
				mat.uniforms.time.value = time;
				mat.uniforms.scrollForce.value = scrollVelocityRef.current;
			}
		});

		const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
		const totalRange = depthRange;

		planesData.current.forEach((plane, i) => {
			let newZ = plane.z + scrollVelocityRef.current * delta * 8;
			let wrapsForward = 0;
			let wrapsBackward = 0;

			if (newZ >= totalRange) {
				wrapsForward = Math.floor(newZ / totalRange);
				newZ -= totalRange * wrapsForward;
			} else if (newZ < 0) {
				wrapsBackward = Math.ceil(-newZ / totalRange);
				newZ += totalRange * wrapsBackward;
			}

			if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
				plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
			}
			if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
				const step = plane.imageIndex - wrapsBackward * imageAdvance;
				plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
			}

			plane.z = ((newZ % totalRange) + totalRange) % totalRange;

			// Calculate normalized position (0 = far back, 1 = closest to camera)
			const t = plane.z / totalRange;

			// Opacity: smooth fade in/out
			let opacity = 1;
			if (t < fadeIn.start) {
				opacity = 0;
			} else if (t < fadeIn.end) {
				opacity = (t - fadeIn.start) / (fadeIn.end - fadeIn.start);
				// Smooth ease
				opacity = opacity * opacity * (3 - 2 * opacity);
			} else if (t > fadeOut.end) {
				opacity = 0;
			} else if (t > fadeOut.start) {
				opacity = 1 - (t - fadeOut.start) / (fadeOut.end - fadeOut.start);
				opacity = opacity * opacity * (3 - 2 * opacity);
			}
			opacity = Math.max(0, Math.min(1, opacity));

			// Blur: strong at edges, clear in the middle
			let blur = 0;
			if (t < blurIn.start) {
				blur = maxBlur;
			} else if (t < blurIn.end) {
				const p = (t - blurIn.start) / (blurIn.end - blurIn.start);
				blur = maxBlur * (1 - p * p);
			} else if (t > blurOut.end) {
				blur = maxBlur;
			} else if (t > blurOut.start) {
				const p = (t - blurOut.start) / (blurOut.end - blurOut.start);
				blur = maxBlur * p * p;
			}
			blur = Math.max(0, Math.min(maxBlur, blur));

			const mat = materials[i];
			if (mat && mat.uniforms) {
				mat.uniforms.opacity.value = opacity;
				mat.uniforms.blurAmount.value = blur;
			}
		});

		// Force re-render to update positions
		forceUpdate((v) => v + 1);
	});

	if (normalizedImages.length === 0) return null;

	return (
		<>
			{planesData.current.map((plane, i) => {
				const texture = textures[plane.imageIndex];
				const material = materials[i];
				if (!texture || !material) return null;

				const config = planeConfigs[i] || { x: 0, y: 0, baseSize: 12 };
				const worldZ = plane.z - depthRange / 2;
				const aspect = texture.image ? texture.image.width / texture.image.height : 1;

				const size = config.baseSize;
				const scale = aspect > 1
					? [size * aspect, size, 1]
					: [size, size / aspect, 1];

				return (
					<ImagePlane
						key={plane.index}
						texture={texture}
						position={[config.x, config.y, worldZ]}
						scale={scale}
						material={material}
					/>
				);
			})}
		</>
	);
}

function LoadingFallback() {
	return (
		<mesh>
			<planeGeometry args={[3, 2]} />
			<meshBasicMaterial color="#e0e0e0" transparent opacity={0.3} />
		</mesh>
	);
}

export default function InfiniteGallery({
	images,
	className = 'w-full',
	style,
}) {
	const [webglSupported, setWebglSupported] = useState(true);

	useEffect(() => {
		try {
			const canvas = document.createElement('canvas');
			const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
			if (!gl) setWebglSupported(false);
		} catch (e) {
			setWebglSupported(false);
		}
	}, []);

	if (!webglSupported) {
		return (
			<div className={className} style={style}>
				<div style={{
					width: '100%', height: '100%', display: 'flex',
					alignItems: 'center', justifyContent: 'center',
					background: '#f5f5f5', borderRadius: '1rem', color: '#999',
				}}>
					<p>WebGL not supported</p>
				</div>
			</div>
		);
	}

	return (
		<GalleryErrorBoundary>
			<div className={className} style={{ height: '100%', ...style }}>
				<Canvas
					camera={{ position: [0, 0, 8], fov: 70 }}
					gl={{ antialias: true, alpha: true }}
					style={{ width: '100%', height: '100%' }}
					onCreated={({ gl }) => {
						const canvas = gl.domElement;
						canvas.addEventListener('webglcontextlost', (e) => {
							e.preventDefault();
							console.warn('WebGL context lost - preventing crash');
						});
					}}
				>
					<Suspense fallback={<LoadingFallback />}>
						<GalleryScene images={images} />
					</Suspense>
				</Canvas>
			</div>
		</GalleryErrorBoundary>
	);
}
