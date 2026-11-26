import { test } from "node:test";
import assert from "node:assert/strict";
import { slugYap } from "../src/lib/slug.ts";

test("Türkçe karakterler adreste sadeleşir", () => {
  assert.equal(slugYap("Çeşme Gülü Otel Sitesi"), "cesme-gulu-otel-sitesi");
  assert.equal(slugYap("İĞNE  ışık / Ölçü"), "igne-isik-olcu");
});

test("boş ya da yalnız işaretli başlık güvenli değer verir", () => {
  assert.equal(slugYap("!!!"), "kayit");
  assert.equal(slugYap("  KBS nedir?  "), "kbs-nedir");
});
