import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for merging class names

const isRealLink = (href) =>
  typeof href === "string" && href.length > 0 && href !== "#";

const ProjectCard = React.forwardRef(
  ({ className, imgSrc, title, description, link, linkText = "View Project", ...props }, ref) => {
    const titleLinked = isRealLink(link);

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
          className
        )}
        {...props}>
        {/* Card Image Section */}
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy" />
        </div>
        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
            {titleLinked ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit hover:underline underline-offset-4 decoration-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <p className="mt-3 flex-1 text-muted-foreground">{description}</p>
          
          {/* Card Link/CTA */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:underline"
            // Prevent card's onClick if it has one
            onClick={(e) => e.stopPropagation()}>
            {linkText}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };