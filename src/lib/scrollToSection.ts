export type SectionID =
  | "inicio"
  | "talleres"
  | "productos"
  | "servicios"
  | "contacto";

export const scrollToSection = (id: SectionID) => {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};