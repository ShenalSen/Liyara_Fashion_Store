// Size charts transcribed from Assets/SIZE_CHARTS. All measurements in inches.

export const WOMEN_CHART = {
  title: 'Women',
  note: 'Garment measurements for frock style DF 001. Pick the size whose bust fits you with about 1 inch of ease.',
  columns: ['M', 'L', 'XL'],
  rows: [
    ['Bust', '38', '40', '42'],
    ['Waist', '36', '38', '40'],
    ['Length', '41', '41½', '42'],
  ],
};

export const TEEN_CHART = {
  title: 'Teens',
  note: 'Measured flat on the garment. If your daughter is between ages, choose the larger size.',
  columns: ['7-8 yrs', '9-10 yrs', '11-12 yrs', '13-14 yrs', '15 yrs'],
  rows: [
    ['Chest', '23', '24', '25½', '27', '28½'],
    ['Waist', '22', '23', '24½', '26', '27½'],
    ['Hip', '24', '25½', '27', '29', '31'],
    ['Shoulder', '10½', '11', '11½', '12', '12½'],
    ['Bodice length', '13', '13½', '14', '14½', '15'],
    ['Skirt length', '15', '16', '17', '18', '19'],
    ['Full length', '28-30', '32-34', '36-38', '40-42', '44-46'],
    ['Neck round', '11½', '12', '12½', '13', '13½'],
    ['Neck width', '5', '5½', '5½', '6', '6'],
    ['Neck depth', '3½', '4', '4', '4½', '4½'],
    ['Sleeve length', '4½', '5', '5', '5½', '5½'],
    ['Sleeve opening', '8½', '9', '9½', '10', '10½'],
  ],
};

export const KIDS_CHART = {
  title: 'Kids',
  note: 'Measured flat on the garment. Dresses are cut with room to grow; if in doubt, size up.',
  columns: ['1-2 yrs', '2-3 yrs', '3-4 yrs', '4-5 yrs', '5-6 yrs'],
  rows: [
    ['Chest', '18', '19', '20', '21', '22'],
    ['Waist', '18', '19', '20', '21', '21'],
    ['Hip', '19', '20', '21', '22', '23'],
    ['Shoulder', '7', '7', '8', '9', '10'],
    ['Bodice length', '8', '9', '10', '11', '12'],
    ['Skirt length', '11', '12', '13', '13', '14'],
    ['Neck round', '9', '9', '9½', '10', '11'],
    ['Neck width', '4', '4', '4', '5', '5'],
    ['Neck depth', '2½', '2½', '3', '3', '3½'],
    ['Sleeve length', '2½', '3½', '4', '4½', '4½'],
    ['Sleeve opening', '7', '7', '7½', '7½', '8'],
  ],
};

export const chartFor = (category) =>
  category === 'kids' ? KIDS_CHART : category === 'teens' ? TEEN_CHART : WOMEN_CHART;

// Suggest a women's size from a bust measurement (inches).
export function suggestWomenSize(bust) {
  const b = Number(bust);
  if (!b) return null;
  if (b <= 37) return 'M';
  if (b <= 39) return 'L';
  if (b <= 41) return 'XL';
  return null;
}

// Suggest a kids/teen size from age (years).
export function suggestByAge(category, age) {
  const a = Number(age);
  if (!a) return null;
  const cols = chartFor(category).columns;
  if (category === 'kids') {
    if (a < 1 || a > 6) return null;
    return cols[Math.min(4, Math.max(0, Math.ceil(a) - 2))];
  }
  if (a < 7 || a > 15) return null;
  if (a <= 8) return cols[0];
  if (a <= 10) return cols[1];
  if (a <= 12) return cols[2];
  if (a <= 14) return cols[3];
  return cols[4];
}
