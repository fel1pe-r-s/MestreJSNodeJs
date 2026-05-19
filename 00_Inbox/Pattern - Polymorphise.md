#patterns


Polymorphise #react para fazer um componente se comporta como outro muito usado no [[radix]] 

Exemplo um component de Button que se comporta como um link sem perder a acessibilidade, para isso usamos o component `Slot` do radix

```tsx
import { ButtonHTMLAttributes } from "react";

import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  asChild?: boolean;

}

  

export function Button({ asChild, ...props }: ButtonProps) {

  const Component = asChild ? Slot : "button";

  return (

    <Component

      className="px-4 py-2 rounded bg-violet-500 text-white font-bold"

      {...props}

    />

  );

}
```

```tsx
import { Button } from "./components/Button";

  

function App() {

  return (

    <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center gap-4">

      <Button>Create account</Button>

      <Button asChild>

        <a href="https://www.youtube.com/watch?v=zhgbanI0UV8&list=WL&index=23">

          Link

        </a>

      </Button>

    </div>

  );

}

  

export default App;
```