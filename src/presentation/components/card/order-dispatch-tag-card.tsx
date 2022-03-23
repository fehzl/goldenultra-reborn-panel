import QRCode from 'react-qr-code';

export function OrderDispatchTagCard() {
  return (
    <div className="border-2 rounded-lg border-dotted">
      <div className="flex flex-row items-center justify-center p-8">
        <div className="border-2 border-gray-700 text-sm">
          <div className="flex flex-col divide-y-2 divide-gray-700">
            <div className="p-2 flex flex-row text-gray-700">
              <span>GOLDENULTRA - GT22032022-030422</span>
            </div>
            <div className="flex flex-row divide-x-2 divide-gray-700">
              <div className="divide-y-2 divide-gray-700 w-72">
                <div className="p-2 flex flex-col">
                  <span>De</span>
                  <span>Goldenultra</span>
                  <span>R. Rio Bonito, 1751</span>
                  <span>Brás</span>
                  <span>São Paulo &mdash; SP</span>
                  <span>03023-000</span>
                </div>
                <div className="p-2 flex flex-col">
                  <span>Para</span>
                  <span>Felipe Feliciano</span>
                  <span>Rua do Mercado, 123</span>
                  <span>Guaianases</span>
                  <span>São Paulo &mdash; SP</span>
                  <span>08440-300</span>
                </div>
              </div>
              <div className="flex p-2 items-center justify-center">
                <QRCode value="123" size={160} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
