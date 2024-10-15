/**
 * Password validator for login pages
 */
import value from 'assets/scss/_themes-vars.module.scss';

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count, tAuth) => {
  if (count === 0) return { label: tAuth('strength'), color: value.grey300 };
  if (count < 3) return { label: tAuth('poor'), color: value.errorMain };
  if (count < 4) return { label: tAuth('weak'), color: value.warningDark };
  if (count < 5) return { label: tAuth('normal'), color: value.orangeMain };
  if (count < 6) return { label: tAuth('good'), color: value.successMain };
  if (count < 7) return { label: tAuth('strong'), color: value.successDark };
  return { label: 'Poor', color: value.errorMain };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 0) strengths += 1;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
