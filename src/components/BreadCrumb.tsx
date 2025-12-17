import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string; // optional for current page
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  items,
  className = "",
}) => {
  return (
    <div className={`bg-[#055A3A] py-8 px-4 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <p className="text-white/90 text-sm font-medium tracking-wide">
          {items.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}

              {index < items.length - 1 && " / "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PageBreadcrumb;
