import { useEffect, useRef } from 'react';

/**
 * useReveal – attaches an IntersectionObserver to a ref and adds the
 * 'is-visible' CSS class when the element enters the viewport.
 * Pairs with the `.reveal` / `.is-visible` classes defined in App.css.
 *
 * @param {IntersectionObserverInit} options - optional observer options
 * @returns {React.RefObject} ref to attach to the target element
 */
function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el); // trigger once then stop observing
        }
      },
      { threshold: 0.12, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default useReveal;
