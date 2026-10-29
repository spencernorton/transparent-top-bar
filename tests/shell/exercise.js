import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export async function exercise(extension, {wait, expect}) {
    expect(extension._settings, 'The extension did not initialize its real settings');
    extension._settings.set_boolean('auto-transparency', false);
    for (const opacity of [20, 80]) {
        extension._settings.set_int('transparency', opacity);
        await wait(700);
        expect(Main.panel.has_style_class_name(`transparent-top-bar-${opacity}`), `Panel did not apply ${opacity}% opacity`);
        expect(!Main.panel.has_style_class_name(`transparent-top-bar-${opacity === 20 ? 80 : 20}`), 'The stale opacity class remained attached');
    }
}

export async function disabled({expect}) {
    expect(!Main.panel.has_style_class_name('transparent-top-bar'), 'Disabling left the panel transparency style attached');
    expect(!Main.panel.has_style_class_name('transparent-top-bar-80'), 'Disabling left the opacity class attached');
}
