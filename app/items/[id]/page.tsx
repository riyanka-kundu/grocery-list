import AddToCart from "@/components/add-to-cart";
import { Badge } from "@/components/ui/badge";
import { GROCERY_DATA } from "@/data";
import { CATEGORY_COLORS, cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return GROCERY_DATA.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = GROCERY_DATA.find((i) => i.id === Number(id));

  if (!item) return { title: "Item not found" };

  return {
    title: `${item.name} | Grocery Cart`,
    description: item.description,
  };
}

const ItemDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const item = GROCERY_DATA.find((i) => i.id === Number(id));

  if (!item) {
    notFound();
  }

  return (
    <div className="flex-1 bg-linear-to-b from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to groceries
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-center">
            <Badge
              variant="secondary"
              className={cn(
                "mb-3 w-fit rounded-full px-3 py-1 text-xs",
                CATEGORY_COLORS[item.category],
              )}
            >
              {item.category}
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {item.name}
            </h1>

            <p className="mt-3 text-3xl font-extrabold tracking-tight text-primary">
              ₹{item.price}
              <span className="text-base font-medium text-muted-foreground">
                {" "}
                / per unit
              </span>
            </p>

            <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="mt-8">
              <AddToCart item={item} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
