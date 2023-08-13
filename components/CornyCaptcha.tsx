'use client';
import React, {
  ReactElement,
  useState,
  createContext,
  useContext,
  createRef,
  useMemo,
  useCallback,
} from 'react';
import { useUser, useSessionContext } from '@supabase/auth-helpers-react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

// import captchaPic1 from '@/public/assets/captcha/cap_1.jpg';
// import captchaPic2 from '@/public/assets/captcha/cap_2.jpg';

const NUM_GAPS = 15;
const NUM_SQUARES = 16;
const SquaresContext = createContext(Array.from(Array(NUM_SQUARES).keys()).map(() => ({ ref: null, val: false })));

// If you use the selectors to make loss it automatically verifies??
type CornyCaptchaProps = {
  captchaIsValid: boolean,
  setCaptchaIsValid: (valid: boolean) => void,
};

// We do some z-indexing in this component! search zIndex and z-index
// 0: image floor and backup bg. their order doesnt matter because in all likelihood:
//      A) the ceiling image is in place, or
//      B) neither image is visible
// 1: image ceiling
// 2: gaps and boxes
// 3: Validation screen
export default function CornyCaptcha({ captchaIsValid, setCaptchaIsValid } : CornyCaptchaProps) : ReactElement {
  const [squares, setSquares] = useState([
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
    { ref: createRef<HTMLButtonElement>(), val: false },
  ]);
  const [userIsACatPerson, setUserIsACatPerson] = useState(true);

  const validateCaptcha = () => {
    if (!captchaIsValid && squares.filter((square) => square.val).length === 1 && squares[14].val) {
      setCaptchaIsValid(true);
    }
  };

  return (
    <SquaresContext.Provider value={squares}>
      <div id="corny-captcha">
        <div
          className="corny-captcha-container bg-white border-gray-300 flex flex-col mb-10"
        >
          <div id="captcha-instructions" className="hidden">
            This is a fake, corny captcha designed to entertain, and defeat trivial bots.
            To pass, select square #15 and then hit Verify.
          </div>
          <div className={classNames(
            'p-7 pt-5 leading-8 mb-2',
            { 'bg-blue-600': !captchaIsValid, 'bg-green-800': captchaIsValid },
          )}
          >
            <h2 className="text-white corny-captcha-prompt flex flex-col">
              Select all squares with
              <b className="text-white prompt-key-word">
                {userIsACatPerson ? 'cats' : 'dogs'}
              </b>
            </h2>
          </div>
          <div className="aspect-square">
            <div className="w-full h-full">
              <div className="h-full corny-captcha-squares grid relative" role="group">
                <div className="captcha-img-backup-bg w-full h-full absolute bg-gray-500" />
                <div
                  className={classNames(
                    'cover-transition-in w-full h-full absolute bg-slate-500',
                    { 'captcha-cover': captchaIsValid },
                  )}
                />
                <Image
                  className="captcha-img-cat"
                  style={{ zIndex: userIsACatPerson ? 1 : 0 }}
                  // src={captchaPic1}
                  src="/assets/foo"
                  alt="Some cute cats"
                  placeholder="blur"
                  fill={true}
                  priority={true}
                  sizes={`
                    (max-width: 640px) 100vw,
                    384px
                `}
                />
                <Image
                  className="captcha-img-dog"
                  style={{ zIndex: userIsACatPerson ? 0 : 1 }}
                  // src={captchaPic2}
                  src="/assets/foo"
                  alt="Some cute dogs"
                  placeholder="blur"
                  fill={true}
                  sizes={`
                    (max-width: 640px) 100vw,
                    384px
                  `}
                />
                {Array.from(Array(NUM_GAPS).keys()).map(
                  (num) => (
                    <div
                      key={`cap-gap-${num}`}
                      style={{ gridArea: `g${num + 1}`, backgroundColor: '#FFFFFF', zIndex: 2 }}
                    />
                  ),
                )}
                {Array.from(Array(NUM_SQUARES).keys()).map(
                  (num) => (
                    <CaptchaBox
                      key={`cap-box-${num}`}
                      num={num}
                      captchaIsValid={captchaIsValid}
                      ref={squares[num].ref}
                      setSelectionForSquare={(squareNum: number, checked: boolean) : void => {
                        const newSquares = squares.map((square) => ({ val: square.val, ref: square.ref }));
                        newSquares[squareNum].val = checked;
                        setSquares(newSquares);
                      }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="captcha-separator w-full" />
          <div className="flex justify-between w-full pt-2">
            <button
              type="button"
              // aria-description={'This button toggles the corny captcha image between cats and dogs. '
              //   + 'The captcha\'s solution is not changed.'}
              aria-label="Toggle the corny captcha image between cats and dogs. The solution is not changed."
              tabIndex={0}
              className={classNames(
                'w-40 h-10 text-sm font-semibold flex justify-center items-center toggle-button text-white',
                { 'bg-green-800': captchaIsValid, 'bg-blue-600': !captchaIsValid },
              )}
              onClick={() => setUserIsACatPerson(!userIsACatPerson)}
            >
              {`I am a ${userIsACatPerson ? 'cat' : 'dog'} person`}
            </button>
            <button
              disabled={captchaIsValid}
              className={classNames(
                'w-24 h-10 text-white text-sm font-semibold flex justify-center items-center',
                { 'bg-green-800': captchaIsValid, 'bg-blue-600': !captchaIsValid },
              )}
              type="button"
              tabIndex={captchaIsValid ? -1 : 0}
              onClick={validateCaptcha}
            >
              {captchaIsValid ? 'Verified ✓' : 'Verify'}
            </button>
          </div>
        </div>
      </div>
    </SquaresContext.Provider>
  );
}

type CaptchaBoxProps = {
  children?: React.ReactNode,
  num: number,
  captchaIsValid: boolean,
  setSelectionForSquare: (num: number, checked: boolean) => void
};

const CaptchaBox = React.forwardRef<HTMLButtonElement, CaptchaBoxProps>(({
  children,
  num,
  captchaIsValid,
  setSelectionForSquare,
}, ref) => {
  const squares = useContext(SquaresContext);
  const selected = squares[num].val;

  const styles = {
    gridArea: `s${num + 1}`,
    zIndex: 2,
    borderStyle: 'solid',
    borderWidth: selected ? '0.25rem' : '0',
    borderColor: '#FFFFFF', // 'rgb(229, 231, 235)',
  };

  const handleToggleSquare = () => {
    if (!captchaIsValid) {
      const newSelected = !selected;
      setSelectionForSquare(num, newSelected);
    }
  };

  const handleNavigateSquare = (keyCode: string) => {
    switch (keyCode) {
      case 'ArrowDown':
        if (num + 4 < NUM_SQUARES) {
          squares[num + 4].ref.current?.focus();
        }
        break;
      case 'ArrowUp':
        if (num - 4 >= 0) {
          squares[num - 4].ref.current?.focus();
        }
        break;
      case 'ArrowLeft':
        if (num - 1 >= 0) {
          squares[num - 1].ref.current?.focus();
        }
        break;
      case 'ArrowRight':
        if (num + 1 < NUM_SQUARES) {
          squares[num + 1].ref.current?.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <button
      type="button"
      tabIndex={captchaIsValid ? -1 : 0}
      ref={ref}
      key={`cap-box-${num}`}
      className="corny-captcha-box"
      role="switch"
      aria-label={`${selected ? 'Deselect' : 'Select'} square #${num + 1}`}
      aria-checked={selected}
      aria-describedby="captcha-instructions"
      disabled={captchaIsValid}
      style={{ ...styles, transition: 'border-width 0.069s ease-out' }}
      onClick={handleToggleSquare}
      onKeyDown={(e: React.KeyboardEvent) : void => {
        if (isArrowKey(e.code)) {
          handleNavigateSquare(e.code);
        }
      }}
    />
  );
});
CaptchaBox.displayName = 'CaptchaBox';

function isArrowKey(keyCode: string) : boolean {
  return (keyCode === 'ArrowDown')
    || (keyCode === 'ArrowUp')
    || (keyCode === 'ArrowLeft')
    || (keyCode === 'ArrowRight');
}
