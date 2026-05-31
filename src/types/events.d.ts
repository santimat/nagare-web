declare global {
  interface WindowEventMap {
    "contact-error": CustomEvent<{ type: "error"; message: string }>;
    "contact-success": CustomEvent<{ type: "sucess"; message: string }>;
  }
}

// needy to ts handle this file like module and global declare works
export {};
