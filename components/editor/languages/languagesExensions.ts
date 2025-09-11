export const getFileExtension = (lang: string) => {
    const map: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      html: "html",
      css: "css",
      json: "json",
      php: "php",
      go: "go",
      rust: "rs",
      sql: "sql",
      markdown: "md",
    };
    return map[lang] || "txt";
  };