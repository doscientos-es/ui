import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button/button";
import { cn } from "../../lib/cn";
export type PaginationProps = {
  /** Currently selected page, starting at one. */
  page: number;
  /** Total number of pages available. */
  pageCount: number;
  /** Called with the page selected by the user. */
  onPageChange: (page: number) => void;
  className?: string;
};
/** Navigation control for a known number of result pages. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  return <nav aria-label="Paginación" className={cn("flex items-center justify-between gap-4", className)}><p className="text-sm text-muted-foreground">Página {page} de {pageCount}</p><div className="flex items-center gap-1"><Button aria-label="Página anterior" isDisabled={page <= 1} onPress={() => onPageChange(page - 1)} size="icon" variant="ghost"><ChevronLeft /></Button>{pages.map((item) => <Button key={item} aria-current={item === page ? "page" : undefined} aria-label={`Página ${item}`} onPress={() => onPageChange(item)} size="icon" variant={item === page ? "secondary" : "ghost"}>{item}</Button>)}<Button aria-label="Página siguiente" isDisabled={page >= pageCount} onPress={() => onPageChange(page + 1)} size="icon" variant="ghost"><ChevronRight /></Button></div></nav>;
}
