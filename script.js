const ropani = document.getElementById('ropani');
const aana = document.getElementById('aana');
const paisa = document.getElementById('paisa');
const daam = document.getElementById('daam');

const bigha = document.getElementById('bigha');
const kattha = document.getElementById('kattha');
const dhur = document.getElementById('dhur');

const sqmeters = document.getElementById('sqmeters');
const sqfeet = document.getElementById('sqfeet');
const hectare = document.getElementById('hectare');

const clearBtn = document.getElementById('clear-btn');

// 1 unit = this many square meters
const ROPANI_TO_M2 = 508.72;
const AANA_TO_M2 = ROPANI_TO_M2 / 16;
const PAISA_TO_M2 = ROPANI_TO_M2 / 64;
const DAAM_TO_M2 = ROPANI_TO_M2 / 256;

const BIGHA_TO_M2 = 6772.63;
const KATTHA_TO_M2 = BIGHA_TO_M2 / 20;
const DHUR_TO_M2 = BIGHA_TO_M2 / 400;

const SQFEET_TO_M2 = 1 / 10.764;
const HECTARE_TO_M2 = 10000;

// Sum a compound system (e.g. Ropani+Aana+Paisa+Daam) into total m²
function sumToM2(values, factors) {
  return values.reduce((total, val, i) => total + val * factors[i], 0);
}

// Break total m² into whole/remainder units, largest to smallest.
// The LAST factor in the array keeps the decimal remainder.
function breakdownM2(totalM2, factors) {
  const results = [];
  let remaining = totalM2;

  factors.forEach((factor, i) => {
    const isLast = i === factors.length - 1;
    if (isLast) {
      results.push(remaining / factor);
    } else {
      const whole = Math.floor(remaining / factor);
      results.push(whole);
      remaining -= whole * factor;
    }
  });

  return results;
}

function setField(el, value) {
  el.value = value === 0 ? '' : value.toFixed(2);
}

// Recompute everything EXCEPT the system the user is currently typing in
function updateFromRopaniSystem() {
  const totalM2 = sumToM2(
    [parseFloat(ropani.value) || 0, parseFloat(aana.value) || 0, parseFloat(paisa.value) || 0, parseFloat(daam.value) || 0],
    [ROPANI_TO_M2, AANA_TO_M2, PAISA_TO_M2, DAAM_TO_M2]
  );

  const [b, k, d] = breakdownM2(totalM2, [BIGHA_TO_M2, KATTHA_TO_M2, DHUR_TO_M2]);
  setField(bigha, b); setField(kattha, k); setField(dhur, d);

  setField(sqmeters, totalM2);
  setField(sqfeet, totalM2 / SQFEET_TO_M2);
  setField(hectare, totalM2 / HECTARE_TO_M2);
}

function updateFromBighaSystem() {
  const totalM2 = sumToM2(
    [parseFloat(bigha.value) || 0, parseFloat(kattha.value) || 0, parseFloat(dhur.value) || 0],
    [BIGHA_TO_M2, KATTHA_TO_M2, DHUR_TO_M2]
  );

  const [r, a, p, dm] = breakdownM2(totalM2, [ROPANI_TO_M2, AANA_TO_M2, PAISA_TO_M2, DAAM_TO_M2]);
  setField(ropani, r); setField(aana, a); setField(paisa, p); setField(daam, dm);

  setField(sqmeters, totalM2);
  setField(sqfeet, totalM2 / SQFEET_TO_M2);
  setField(hectare, totalM2 / HECTARE_TO_M2);
}

function updateFromModernSystem(totalM2) {
  const [r, a, p, dm] = breakdownM2(totalM2, [ROPANI_TO_M2, AANA_TO_M2, PAISA_TO_M2, DAAM_TO_M2]);
  setField(ropani, r); setField(aana, a); setField(paisa, p); setField(daam, dm);

  const [b, k, d] = breakdownM2(totalM2, [BIGHA_TO_M2, KATTHA_TO_M2, DHUR_TO_M2]);
  setField(bigha, b); setField(kattha, k); setField(dhur, d);
}

// --- Ropani system listeners ---
[ropani, aana, paisa, daam].forEach(el => el.addEventListener('input', updateFromRopaniSystem));

// --- Bigha system listeners ---
[bigha, kattha, dhur].forEach(el => el.addEventListener('input', updateFromBighaSystem));

// --- Modern system listeners ---
sqmeters.addEventListener('input', () => {
  updateFromModernSystem(parseFloat(sqmeters.value) || 0);
  setField(sqfeet, (parseFloat(sqmeters.value) || 0) / SQFEET_TO_M2);
  setField(hectare, (parseFloat(sqmeters.value) || 0) / HECTARE_TO_M2);
});

sqfeet.addEventListener('input', () => {
  const totalM2 = (parseFloat(sqfeet.value) || 0) * SQFEET_TO_M2;
  updateFromModernSystem(totalM2);
  setField(sqmeters, totalM2);
  setField(hectare, totalM2 / HECTARE_TO_M2);
});

hectare.addEventListener('input', () => {
  const totalM2 = (parseFloat(hectare.value) || 0) * HECTARE_TO_M2;
  updateFromModernSystem(totalM2);
  setField(sqmeters, totalM2);
  setField(sqfeet, totalM2 / SQFEET_TO_M2);
});

clearBtn.addEventListener('click', () => {
  [ropani, aana, paisa, daam, bigha, kattha, dhur, sqmeters, sqfeet, hectare].forEach(el => el.value = '');
});