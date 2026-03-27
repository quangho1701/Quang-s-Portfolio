import { useState, forwardRef } from "react"
import { cn } from "@/lib/utils"

const FolderThumbnail = forwardRef(({ image, title, delay, isVisible, index, isExploding }, ref) => {
  const rotations = [-12, 0, 12]
  const translations = [-55, 0, 55]
  const scatterX = [-180, 0, 180]
  const scatterY = [-120, -160, -120]

  return (
    <div
      ref={ref}
      className={cn(
        "absolute w-20 h-28 rounded-lg overflow-hidden shadow-xl",
        "bg-card border border-border",
      )}
      style={{
        transform: isExploding
          ? `translateY(${scatterY[index]}px) translateX(${scatterX[index]}px) rotate(${rotations[index] * 3}deg) scale(0.2)`
          : isVisible
            ? `translateY(-90px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
            : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
        opacity: isExploding ? 0 : isVisible ? 1 : 0,
        filter: isExploding ? "blur(4px)" : "none",
        transition: isExploding
          ? `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms`
          : `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        zIndex: 10 - index,
        left: "-40px",
        top: "-56px",
        pointerEvents: isExploding ? "none" : "auto",
      }}
    >
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-primary-foreground truncate">
        {title}
      </p>
    </div>
  )
})
FolderThumbnail.displayName = "FolderThumbnail"

export function AnimatedFolder({ title, projects, className, onFolderClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExploding, setIsExploding] = useState(false)

  const handleClick = () => {
    if (!isHovered || isExploding) return
    setIsExploding(true)
    onFolderClick?.()
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "p-8 rounded-2xl cursor-pointer",
        "transition-all duration-500 ease-out",
        "group",
        !isExploding && "bg-card border border-border hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/30",
        isExploding && "border border-transparent",
        className
      )}
      style={{
        minWidth: "280px",
        minHeight: "320px",
        perspective: "1000px",
        backgroundColor: isExploding ? "transparent" : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { if (!isExploding) setIsHovered(false) }}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at 50% 70%, var(--accent) 0%, transparent 70%)",
          opacity: isExploding ? 0 : isHovered ? 0.08 : 0,
          transition: isExploding ? "opacity 300ms ease" : "opacity 500ms ease",
        }}
      />

      <div className="relative flex items-center justify-center mb-4" style={{ height: "160px", width: "200px" }}>
        {/* Folder back panel */}
        <div
          className="absolute w-32 h-24 bg-folder-back rounded-lg shadow-md"
          style={{
            transformOrigin: "bottom center",
            transform: isExploding
              ? "translateX(-70px) translateY(-40px) rotate(-20deg) scale(0.4)"
              : isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
            opacity: isExploding ? 0 : 1,
            filter: isExploding ? "blur(8px)" : "none",
            transition: isExploding
              ? "all 450ms cubic-bezier(0.32, 0, 0.67, 0)"
              : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 10,
          }}
        />

        {/* Folder tab */}
        <div
          className="absolute w-12 h-4 bg-folder-tab rounded-t-md"
          style={{
            top: "calc(50% - 48px - 12px)",
            left: "calc(50% - 64px + 16px)",
            transformOrigin: "bottom center",
            transform: isExploding
              ? "translateY(-60px) translateX(10px) rotate(25deg) scale(0.3)"
              : isHovered ? "rotateX(-25deg) translateY(-2px)" : "rotateX(0deg)",
            opacity: isExploding ? 0 : 1,
            filter: isExploding ? "blur(6px)" : "none",
            transition: isExploding
              ? "all 400ms cubic-bezier(0.32, 0, 0.67, 0) 30ms"
              : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 10,
          }}
        />

        {/* Thumbnails */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
          }}
        >
          {projects.slice(0, 3).map((project, index) => (
            <FolderThumbnail
              key={project.id}
              image={project.image}
              title={project.title}
              delay={index * 80}
              isVisible={isHovered}
              index={index}
              isExploding={isExploding}
            />
          ))}
        </div>

        {/* Folder front panel */}
        <div
          className="absolute w-32 h-24 bg-folder-front rounded-lg shadow-lg"
          style={{
            top: "calc(50% - 48px + 4px)",
            transformOrigin: "bottom center",
            transform: isExploding
              ? "translateX(70px) translateY(30px) rotate(18deg) scale(0.4)"
              : isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
            opacity: isExploding ? 0 : 1,
            filter: isExploding ? "blur(8px)" : "none",
            transition: isExploding
              ? "all 450ms cubic-bezier(0.32, 0, 0.67, 0) 60ms"
              : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 30,
          }}
        />

        {/* Folder front shine */}
        <div
          className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
          style={{
            top: "calc(50% - 48px + 4px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
            transformOrigin: "bottom center",
            transform: isExploding
              ? "translateX(70px) translateY(30px) rotate(18deg) scale(0.4)"
              : isHovered ? "rotateX(25deg) translateY(8px)" : "rotateX(0deg)",
            opacity: isExploding ? 0 : 1,
            transition: isExploding
              ? "all 450ms cubic-bezier(0.32, 0, 0.67, 0) 60ms"
              : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 31,
          }}
        />
      </div>

      {/* Title */}
      <h3
        className="text-lg font-semibold text-foreground mt-4"
        style={{
          transform: isExploding ? "translateY(15px)" : isHovered ? "translateY(4px)" : "translateY(0)",
          opacity: isExploding ? 0 : 1,
          transition: isExploding
            ? "all 300ms cubic-bezier(0.32, 0, 0.67, 0)"
            : "all 300ms ease",
        }}
      >
        {title}
      </h3>

      {/* Project count */}
      <p
        className="text-sm text-muted-foreground"
        style={{
          opacity: isExploding ? 0 : isHovered ? 0.7 : 1,
          transition: isExploding
            ? "all 250ms cubic-bezier(0.32, 0, 0.67, 0)"
            : "all 300ms ease",
        }}
      >
        {projects.length} projects
      </p>

      {/* Hint text */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground"
        style={{
          opacity: isExploding ? 0 : isHovered ? 0.8 : 0.6,
          transform: isExploding ? "translateY(10px)" : "translateY(0)",
          transition: "all 300ms ease",
        }}
      >
        <span>{isHovered ? "Click to open" : "Hover to explore"}</span>
      </div>
    </div>
  )
}
