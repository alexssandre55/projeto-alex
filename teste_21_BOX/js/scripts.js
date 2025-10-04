document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const horizontalSlider = document.getElementById('horizontal');
    const horizontalValue = document.getElementById('horizontal-value');
    const verticalSlider = document.getElementById('vertical');
    const verticalValue = document.getElementById('vertical-value');
    const blurSlider = document.getElementById('blur');
    const blurValue = document.getElementById('blur-value');
    const spreadSlider = document.getElementById('spread');
    const spreadValue = document.getElementById('spread-value');
    const opacitySlider = document.getElementById('opacity');
    const opacityValue = document.getElementById('opacity-value');
    const colorPicker = document.getElementById('color');
    const box = document.getElementById('box');
    const ruleSpan = document.querySelector('#rule span');
    const webkitRuleSpan = document.querySelector('#webkit-rule span');
    const mozRuleSpan = document.querySelector('#moz-rule span');
    const copyButton = document.getElementById('copy-button');
    // Função para atualizar a box shadow
    function updateBoxShadow() {
        const h = horizontalSlider.value;
        const v = verticalSlider.value;
        const b = blurSlider.value;
        const s = spreadSlider.value;
        const o = opacitySlider.value / 100;
        const color = hexToRgba(colorPicker.value, o);
        const boxShadowValue = `${h}px ${v}px ${b}px ${s}px ${color}`;
        // Aplica a sombra à caixa
        box.style.boxShadow = boxShadowValue;
        // Atualiza os textos das regras CSS
        ruleSpan.textContent = boxShadowValue;
        webkitRuleSpan.textContent = boxShadowValue;
        mozRuleSpan.textContent = boxShadowValue;
    }
    // Função para converter hex para rgba
    function hexToRgba(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // Sincroniza sliders com inputs de texto
    function syncSliderWithInput(slider, input, unit = '') {
        slider.addEventListener('input', function () {
            input.value = this.value;
            updateBoxShadow();
        });
        input.addEventListener('input', function () {
            let value = parseInt(this.value) || 0;
            // Limita o valor aos limites do slider
            value = Math.max(slider.min, Math.min(slider.max, value));
            slider.value = value;
            this.value = value;
            updateBoxShadow();
        });
    }
    // Configura a sincronização para todos os controles
    syncSliderWithInput(horizontalSlider, horizontalValue);
    syncSliderWithInput(verticalSlider, verticalValue);
    syncSliderWithInput(blurSlider, blurValue);
    syncSliderWithInput(spreadSlider, spreadValue);
    syncSliderWithInput(opacitySlider, opacityValue);
    // Atualiza quando a cor muda
    colorPicker.addEventListener('input', updateBoxShadow);
    // Configura o botão de copiar
    copyButton.addEventListener('click', function () {
        const cssText = `box-shadow: ${ruleSpan.textContent};\n-webkit-box-shadow: ${ruleSpan.textContent};\n-moz-box-shadow: ${ruleSpan.textContent};`;
           navigator.clipboard.writeText(cssText).then(function () {
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copiado!';
            setTimeout(function () {
                copyButton.textContent = originalText;
            }, 2000);
        });
    });
    // Inicializa a box shadow
    updateBoxShadow();
});
