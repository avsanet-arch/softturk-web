import { test } from "node:test";
import assert from "node:assert/strict";
import { sayiOku, indirimYuzdesi, bedavaAy, paraBirimi } from "../src/lib/fiyat.ts";

test("sayiOku Türkçe yazımı anlar", () => {
  assert.equal(sayiOku("1.250 ₺"), 1250);
  assert.equal(sayiOku("900 ₺ / ay"), 900);
  assert.equal(sayiOku("1.250,50 TL"), 1250.5);
  assert.equal(sayiOku("20 €"), 20);
  assert.equal(sayiOku("Fiyat sorunuz"), null);
  assert.equal(sayiOku(""), null);
});

test("indirim ve bedava ay", () => {
  assert.equal(indirimYuzdesi("1.500 ₺", "900 ₺"), 40);
  assert.equal(indirimYuzdesi("900 ₺", "900 ₺"), null);
  assert.equal(indirimYuzdesi("", "900 ₺"), null);
  assert.equal(bedavaAy("900 ₺", "9.000 ₺"), 2);
  assert.equal(bedavaAy("900 ₺", "10.800 ₺"), null);
  assert.equal(paraBirimi("20 €"), "€");
  assert.equal(paraBirimi("900 TL"), "₺");
});
