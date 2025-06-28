import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Alert = ({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "Learn more",
}) => {
  const variantClasses = {
    success: {
      container:
        "border-green-500 bg-green-50 dark:border-green-500/30 dark:bg-green-500/15",
      icon: "text-green-500",
    },
    error: {
      container:
        "border-red-500 bg-red-50 dark:border-red-500/30 dark:bg-red-500/15",
      icon: "text-red-500",
    },
    warning: {
      container:
        "border-yellow-500 bg-yellow-50 dark:border-yellow-500/30 dark:bg-yellow-500/15",
      icon: "text-yellow-500",
    },
    info: {
      container:
        "border-blue-500 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-500/15",
      icon: "text-blue-500",
    },
  };

  const icons = {
    success: (
      <svg
        className="fill-current"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
          10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5
          1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
        />
      </svg>
    ),
    error: (
      <svg
        className="fill-current"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
          10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="fill-current"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-4h-2v4h2v-4z"
        />
      </svg>
    ),
    info: (
      <svg
        className="fill-current"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
          10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z"
        />
      </svg>
    ),
  };

  return (
    <div className={`rounded-xl border p-4 ${variantClasses[variant].container}`}>
      <div className="flex items-start gap-3">
        <div className={`-mt-0.5 ${variantClasses[variant].icon}`}>
          {icons[variant]}
        </div>
        <div>
          <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
          {showLink && (
            <Link
              to={linkHref}
              className="inline-block mt-3 text-sm font-medium text-gray-500 underline dark:text-gray-400"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  showLink: PropTypes.bool,
  linkHref: PropTypes.string,
  linkText: PropTypes.string,
};

export default Alert;
