// birinci_derece_cozucu.py dosyasindaki uc sayisal yontem.
// Sayisal formul veya adimlar degistirilmemistir.
function euler1d(f, xi, yi, xf) {
  const yf = yi + f(xi, yi) * (xf - xi);
  return yf;
}
function rk2_1st_midpoint(f, xi, yi, xf) {
  const k1 = f(xi, yi);
  const k2 = f(xi + 0.5 * (xf - xi), yi + 0.5 * k1 * (xf - xi));
  const yf = yi + k2 * (xf - xi);
  return yf;
}
function rk4_1st(f, xi, yi, xf) {
  const h = xf - xi;
  const k1 = f(xi, yi);
  const k2 = f(xi + h / 2.0, yi + (k1 * h) / 2.0);
  const k3 = f(xi + h / 2.0, yi + (k2 * h) / 2.0);
  const k4 = f(xi + h, yi + k3 * h);
  const yf = yi + ((k1 + 2.0 * (k2 + k3) + k4) * h) / 6.0;
  return yf;
}
function coz(f, xi, yi, xmax, nos, key) {
  if (!Number.isInteger(nos) || nos <= 0 || xmax <= xi) {
    throw new Error("Adım sayısı pozitif olmalı, bitiş x başlangıçtan büyük olmalı.");
  }
  if (![0, 1, 2].includes(key)) {
    throw new Error("Yöntem 0, 1 veya 2 olmalı.");
  }
  const h = (xmax - xi) / nos;
  const x_degerleri = [xi];
  const y_degerleri = [yi];
  let i = 0;
  while (i < nos) {
    let xf = xi + h;
    if (i === nos - 1) xf = xmax;
    let yf;
    if (key === 0) yf = euler1d(f, xi, yi, xf);
    if (key === 1) yf = rk2_1st_midpoint(f, xi, yi, xf);
    if (key === 2) yf = rk4_1st(f, xi, yi, xf);
    if (!Number.isFinite(yf)) {
      throw new Error("Çözüm sonlu bir sayı değil. Denklemi ve adım sayısını kontrol edin.");
    }
    x_degerleri.push(xf);
    y_degerleri.push(yf);
    xi = xf;
    yi = yf;
    i = i + 1;
  }
  return [x_degerleri, y_degerleri];
}