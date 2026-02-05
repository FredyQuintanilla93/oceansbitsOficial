/**
 * Tests para utilidades generales
 * Pruebas de funciones y comportamientos comunes
 */

describe('Utilidades Generales', () => {
  describe('DOM Queries', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="container">
          <button class="btn">Button 1</button>
          <button class="btn">Button 2</button>
          <div id="special">Special Element</div>
        </div>
      `;
    });

    test('querySelector debería encontrar elementos', () => {
      const el = document.querySelector('.btn');
      expect(el).toBeTruthy();
      expect(el.textContent).toBe('Button 1');
    });

    test('querySelectorAll debería encontrar múltiples elementos', () => {
      const els = document.querySelectorAll('.btn');
      expect(els.length).toBe(2);
    });

    test('getElementById debería encontrar elemento por ID', () => {
      const el = document.getElementById('special');
      expect(el).toBeTruthy();
      expect(el.textContent).toBe('Special Element');
    });
  });

  describe('Métodos de Elementos', () => {
    test('classList.add debería agregar clases', () => {
      const el = document.createElement('div');
      el.classList.add('nueva-clase');
      expect(el.classList.contains('nueva-clase')).toBe(true);
    });

    test('classList.remove debería remover clases', () => {
      const el = document.createElement('div');
      el.classList.add('clase1');
      el.classList.remove('clase1');
      expect(el.classList.contains('clase1')).toBe(false);
    });

    test('classList.toggle debería alternar clases', () => {
      const el = document.createElement('div');
      el.classList.toggle('active');
      expect(el.classList.contains('active')).toBe(true);
      el.classList.toggle('active');
      expect(el.classList.contains('active')).toBe(false);
    });

    test('setAttribute debería establecer atributos', () => {
      const el = document.createElement('div');
      el.setAttribute('data-value', '123');
      expect(el.getAttribute('data-value')).toBe('123');
    });

    test('dataset debería acceder a data attributes', () => {
      const el = document.createElement('div');
      el.dataset.plan = 'ancla';
      expect(el.dataset.plan).toBe('ancla');
    });
  });

  describe('Event Listeners', () => {
    test('addEventListener debería registrar listeners', () => {
      const el = document.createElement('button');
      const handler = jest.fn();
      el.addEventListener('click', handler);
      el.click();
      expect(handler).toHaveBeenCalled();
    });

    test('removeEventListener debería remover listeners', () => {
      const el = document.createElement('button');
      const handler = jest.fn();
      el.addEventListener('click', handler);
      el.removeEventListener('click', handler);
      el.click();
      expect(handler).not.toHaveBeenCalled();
    });

    test('Event.preventDefault debería prevenir comportamiento', () => {
      const event = new Event('submit');
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      event.preventDefault();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Estilos CSS', () => {
    test('style.width debería establecer ancho', () => {
      const el = document.createElement('div');
      el.style.width = '100px';
      expect(el.style.width).toBe('100px');
    });

    test('style.transform debería establecer transformación', () => {
      const el = document.createElement('div');
      el.style.transform = 'translateX(10px)';
      expect(el.style.transform).toBe('translateX(10px)');
    });

    test('style.opacity debería establecer opacidad', () => {
      const el = document.createElement('div');
      el.style.opacity = '0.5';
      expect(el.style.opacity).toBe('0.5');
    });

    test('getComputedStyle debería obtener estilos calculados', () => {
      const el = document.createElement('div');
      el.style.display = 'none';
      const computed = window.getComputedStyle(el);
      expect(computed.display).toBe('none');
    });
  });

  describe('Validaciones de Datos', () => {
    test('String no vacío debería ser válido', () => {
      const str = 'Oceansbits';
      expect(str).toBeTruthy();
      expect(typeof str).toBe('string');
    });

    test('Números deberían ser válidos', () => {
      const num = 42;
      expect(typeof num).toBe('number');
      expect(num).toBeGreaterThan(0);
    });

    test('Arrays debería tener longitud', () => {
      const arr = ['a', 'b', 'c'];
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(3);
    });

    test('Objetos debería tener propiedades', () => {
      const obj = { name: 'Oceansbits', year: 2026 };
      expect(obj.name).toBe('Oceansbits');
      expect(obj.year).toBe(2026);
    });
  });

  describe('Métodos String', () => {
    test('includes debería buscar en string', () => {
      const str = 'Oceansbits - Facturación Electrónica';
      expect(str.includes('Facturación')).toBe(true);
      expect(str.includes('xyz')).toBe(false);
    });

    test('startsWith debería verificar inicio', () => {
      const str = 'Oceansbits';
      expect(str.startsWith('Ocean')).toBe(true);
      expect(str.startsWith('bits')).toBe(false);
    });

    test('endsWith debería verificar final', () => {
      const str = 'Oceansbits';
      expect(str.endsWith('bits')).toBe(true);
      expect(str.endsWith('Ocean')).toBe(false);
    });

    test('split debería dividir string', () => {
      const str = 'a,b,c';
      const parts = str.split(',');
      expect(parts.length).toBe(3);
      expect(parts[0]).toBe('a');
    });
  });
});

describe('Performance', () => {
  test('Operaciones simples deberían ser rápidas', () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement('div');
    }
    const end = performance.now();
    const time = end - start;
    expect(time).toBeLessThan(100); // Menos de 100ms
  });

  test('querySelector debería ser razonable', () => {
    document.body.innerHTML = '<div class="test"></div>';
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      document.querySelector('.test');
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(50);
  });
});
