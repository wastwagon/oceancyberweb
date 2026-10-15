"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useCart } from "@/components/commerce/CartProvider";
import { SSL_PACKAGES, type SslPackage } from "@/lib/ssl-packages";
import { FxPrice } from "@/components/currency/FxPrice";

function SslCard({ pkg }: { pkg: SslPackage }) {
  const { addItem } = useCart();

  function addSsl() {
    addItem({
      id: `ssl-${pkg.id}-${Date.now()}`,
      kind: "ssl",
      label: pkg.name,
      planCode: pkg.planCode,
      priceGhs: pkg.priceAnnualGhs,
      interval: "year",
      reference: `SSL-${pkg.id.toUpperCase()}`,
      addons: [],
    });
  }

  return (
    <article
      className={`sa-card flex h-full flex-col p-6 md:p-8 ${
        pkg.popular ? "border-sa-primary/50" : ""
      }`}
    >
      {pkg.popular ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-sa-primary">
          Most chosen
        </p>
      ) : null}
      <h3 className="mt-2 font-heading text-xl font-bold text-white">{pkg.name}</h3>
      <p className="mt-2 text-sm text-sa-muted/70">{pkg.tagline}</p>
      <div className="mt-6">
        <FxPrice
          amountGhs={pkg.priceAnnualGhs}
          suffix="/yr"
          className="font-heading text-3xl font-bold text-white [&>span]:text-sa-primary"
        />
        <p className="mt-2 text-sm text-sa-muted/70">
          Renews at{" "}
          <FxPrice
            amountGhs={pkg.renewsAtGhs}
            suffix="/yr"
            compactGhsSymbol
            className="inline text-sa-muted [&>span]:font-semibold"
          />
        </p>
      </div>
      <ul className="mt-6 flex-1 space-y-2">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm text-sa-muted/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-sa-muted/55">{pkg.idealFor}</p>
      <div className="mt-6 flex flex-col gap-2">
        <button type="button" onClick={addSsl} className="sa-btn-primary w-full">
          Add to cart
        </button>
        <Link
          href="/checkout/cart"
          className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-sa-primary underline underline-offset-4"
        >
          View cart
        </Link>
      </div>
    </article>
  );
}

export function SslPackagesSection({ id = "packages" }: { id?: string }) {
  return (
    <section id={id} className="sa-section relative z-10 border-t border-sa-border">
      <div className="sa-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="sa-eyebrow">Certificates</p>
          <h2 className="sa-title mt-4">SSL priced in Ghana cedis</h2>
          <p className="sa-subtitle mx-auto mt-4">
            Commercial certificates when Let’s Encrypt is not enough. First-year and
            renewal list prices match.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {SSL_PACKAGES.map((pkg) => (
            <SslCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
