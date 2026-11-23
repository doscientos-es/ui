# SignaturePad

Captura una marca manuscrita con ratón, dedo o lápiz. No acepta un documento ni
guarda la firma automáticamente. La superficie mantiene la misma proporción al
cambiar de tamaño y conserva los trazos hasta que se borran explícitamente.

```tsx
import { useState } from 'react'
import { SignaturePad, signatureToSvg, type SignatureValue } from '@doscientos/ui/signature-pad'

function Example() {
  const [signature, setSignature] = useState<SignatureValue | null>(null)
  return <SignaturePad value={signature} onChange={setSignature} />
}
```

`onChange` recibe los datos serializables mientras se dibuja y `null` al borrar.
`defaultValue` permite inicializar el componente sin controlarlo. Para obtener una
imagen independiente, llama a `signatureToSvg(signature)` cuando no sea `null`.
El SVG tiene fondo transparente y tinta negra; los datos mantienen coordenadas
en un área de 600 × 240 para poder restaurar la firma a cualquier tamaño.

La aplicación debe ofrecer una alternativa accesible a quien no pueda dibujar,
pedir la aceptación explícita y gestionar la identidad, el documento, la seguridad
y la conservación de las evidencias. Una imagen de una firma por sí sola no
garantiza identidad, integridad ni validez jurídica.
