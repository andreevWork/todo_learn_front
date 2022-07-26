export function debounce(func: () => any, wait:number, immediate=false) {
  let timeout:any ;

  return function executedFunction(this: any): any {
    const context = this;
    const args: any = arguments;

    var later = function ():any {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
