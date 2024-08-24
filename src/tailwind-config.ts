// https://tailwindcss.com/docs/configuration#referencing-in-java-script

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

export { fullConfig as tailwindFullConfig };
