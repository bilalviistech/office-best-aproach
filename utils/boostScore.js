const W = { homepage: 1000, top: 300, featured: 100, urgent: 30 };

export function calculateBoostScore(items = []) {
  const now = new Date();
  let score = 0;
  for (const b of items) {
    if (!b?.type || !b?.startsAt || !b?.endsAt) continue;
    if (new Date(b.startsAt) <= now && new Date(b.endsAt) >= now) {
      score += W[b.type] || 0;
    }
  }
  return score;
}
