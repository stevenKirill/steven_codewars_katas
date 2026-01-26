conole.log(rating(
  {
    'katie': 5,
    'laura': 3,
    'saajid': 2,
    'alex': 3,
    'john': 2,
    'mr': 0
  },
  'laura',
));
// sum = 5 + 3 × 2 + 2 + 3 + 2 + 0 = 18
// average = 18 / 6 <= 5 => 'Get Out Now!'

function rating(meet, boss) {
  const entries = Object.entries(meet);
  const sum = entries.reduce((acc, [key, value]) => {
    return key === boss ? acc + value * 2 : acc + value;
  }, 0);
  const average = sum / entries.length;

  return average <= 5 ? 'Get Out Now!' : 'Nice Work Champ!';
}
