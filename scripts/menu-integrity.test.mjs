import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const source = readFileSync(new URL("../data/menu.ts", import.meta.url), "utf8");
const menu = JSON.parse(source.match(/export const menuCategories: MenuCategory\[\] = (\[[\s\S]*\]);/)[1]);
const items = menu.flatMap(c => c.items);
const find = name => items.find(i => i.name === name);

test("All 142 original menu items remain in 15 categories", () => {
  assert.equal(menu.length, 15);
  assert.equal(items.length, 142);
});
test("Drink prices stay paired with each volume", () => {
  assert.deepEqual(find("Вода «Bon aqua»").variants, [{ weight: "500 мл", price: 110 }, { weight: "1000 мл", price: 150 }]);
  assert.deepEqual(find("Кока-кола").variants, [{ weight: "500 мл", price: 180 }, { weight: "1000 мл", price: 250 }]);
  assert.deepEqual(find("Чай черный, фруктовый или зеленый").variants, [{ weight: "0,5 л", price: 180 }, { weight: "0,8 л", price: 230 }, { weight: "1,0 л", price: 280 }]);
});
test("Cuisine highlights match the café's supplied menu", () => {
  for (const [name, weight, price] of [["Баранина корейка", "200 г", 910], ["Люля-кебаб из баранины", "200 г", 580], ["По-мегрельски", "500 г", 500], ["Садж на три персоны", "1000 г", 1950], ["Садж на пять персон", "1500 г", 2600], ["Чкмерули", "250 г", 450], ["Долма из телятины", "250 г", 480]]) {
    assert.equal(find(name).weight, weight, name);
    assert.equal(find(name).price, price, name);
  }
});
