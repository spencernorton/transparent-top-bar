import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export async function exercise(extension, {wait, expect}) {
    expect(extension._settings, 'The extension did not initialize its real settings');
    extension._settings.set_boolean('auto-transparency', false);
    for (const opacity of [20, 80]) {
        extension._settings.set_int('transparency', opacity);
        await wait(700);
        const style = Main.panel.get_style() ?? '';
        const alpha = (opacity / 100).toFixed(2);
        const otherAlpha = ((opacity === 20 ? 80 : 20) / 100).toFixed(2);
        expect(Main.panel.has_style_class_name('transparent-top-bar'), 'Panel is missing transparent-top-bar class');
        expect(style.includes(`background-color: rgba(0, 0, 0, ${alpha})`), `Panel did not apply ${opacity}% opacity (style: ${style})`);
        expect(!style.includes(`background-color: rgba(0, 0, 0, ${otherAlpha})`), 'The stale opacity declaration remained attached');
    }
}

export async function disabled({expect}) {
    const style = Main.panel.get_style() ?? '';
    expect(!Main.panel.has_style_class_name('transparent-top-bar'), 'Disabling left the panel transparency style attached');
    expect(!style.includes('background-color: rgba(0, 0, 0,'), 'Disabling left the inline opacity declaration attached');
}
