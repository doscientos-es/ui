import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { EmptyState, EmptyStateDescription, EmptyStateTitle } from "./empty-state";
import { Skeleton } from "./skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

const meta = { title: "Data display/Patterns" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const CardPattern: Story = {
  render: () => <Card className="w-96"><CardHeader><CardTitle>Cliente activo</CardTitle><CardDescription>Actualizado hace 2 minutos</CardDescription></CardHeader><CardContent><Badge variant="success">Al día</Badge></CardContent><CardFooter className="text-sm text-muted-foreground">Facturación mensual</CardFooter></Card>,
};

export const TablePattern: Story = {
  render: () => <Table className="min-w-120"><TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Estado</TableHead><TableHead>Última actividad</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Acme S.L.</TableCell><TableCell><Badge variant="success">Activo</Badge></TableCell><TableCell>Hoy</TableCell></TableRow><TableRow><TableCell>Studio Norte</TableCell><TableCell><Badge variant="neutral">Pendiente</Badge></TableCell><TableCell>Ayer</TableCell></TableRow></TableBody></Table>,
};

export const EmptyAndLoading: Story = {
  render: () => <div className="flex w-96 flex-col gap-5"><EmptyState><EmptyStateTitle>No hay facturas</EmptyStateTitle><EmptyStateDescription>Crea la primera factura para verla aquí.</EmptyStateDescription></EmptyState><div className="space-y-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /></div></div>,
};