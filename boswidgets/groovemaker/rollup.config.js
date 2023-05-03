import { terser } from 'rollup-plugin-terser';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';

export default {
    input: 'main.js',
    output: { file: 'main.bundle.js', format: 'esm' },
    plugins: [        
        (() => ({
            transform(code, id) {
                const urlMatch = code.match(/(new URL\([^),]+\,\s*import.meta.url\s*\))/);
                if (urlMatch) {
                    const urlWithAbsolutePath = urlMatch[1].replace('import.meta.url', `'file://${id}'`);

                    const func = new Function('return ' + urlWithAbsolutePath);
                    const resolvedUrl = func();
                    const pathname = resolvedUrl.pathname;

                    if (pathname.endsWith('.js')) {
                        code = code.replace(urlMatch[0], `URL.createObjectURL(new Blob([
                            (() => {
                                function jsFunc() {${readFileSync(pathname).toString()}}
                                const jsFuncSource = jsFunc.toString();
                                return jsFuncSource.substring( jsFuncSource.indexOf('{') + 1,  jsFuncSource.lastIndexOf('}'));
                            })()
                        ], { type: 'text/javascript' }))`);
                    }
                }
                return {
                    code: code
                }
            }
        }))(),
        terser(),
        {
            name: 'inline-js',
            closeBundle: () => {
                const js = readFileSync('main.bundle.js').toString();
                const html = readFileSync('widgetiframe.html').toString()
                    .replace(`<script type="module" src="main.js"></script>`,
                        `<script type="module">${js}</script>`);

                const dataUri = `data:text/html;base64,${Buffer.from(html).toString('base64')}`;
                const widgetjsx = readFileSync('widget.jsx').toString();
                writeFileSync(`widget.bundle.jsx`, widgetjsx.replace('IFRAME_DATA_URI', dataUri));
                unlinkSync('main.bundle.js');
            }
        }
    ]
};
