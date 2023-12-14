import { useEffect, useState } from 'react';

function App() {
  let [second, setSecond] = useState(0);

  let [startButton, setStartButton] = useState(false);
  let [resetButton, setResetButton] = useState(false);

  const [classRed, setClassRed] = useState(false);
  const [valueSalary, setValueSalary] = useState('');
  const [valueInTime, setValueInTime] = useState('');

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (startButton) {
      const interval = setInterval(() => {
        setSecond((prevSecond) => prevSecond + 1);

        setClassRed((prev) => !prev);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startButton]);

  function startTimer() {
    setResetButton(false);
    if (valueSalary) {
      setErrorMessage(false);
      setStartButton(true);
    } else {
      setErrorMessage(true);
    }
  }

  function stopTimer() {
    setStartButton(false);
  }

  function resetTimer() {
    setResetButton(true);
    setStartButton(false);
    setErrorMessage(false);
    setSecond(0);
  }

  function handleInput(e) {
    const roundedValue = e.target.value / 36000;
    const fixedValue = parseFloat(roundedValue.toFixed(2));
    setValueSalary(fixedValue);
  }
  useEffect(() => {
    setValueInTime(Math.round(valueSalary * second * 100) / 100);
  }, [second, startButton]);

  return (
    <div className='root'>
      <section className='page'>
        <div className='wrapper'>
          <div className='wrapper__input'>
            <p>Укажите денег за час:</p>
            <input
              onChange={handleInput}
              type='text'
              placeholder='Введите ставку'
              required
              disabled={startButton}
            />
          </div>
          <div className='wrapper__button'>
            <div className='money-counter'>
              <p className='money-counter__text'>Заработано </p>
              <span className={`money-counter__sum ${classRed ? 'money-counter__sum-red' : ''}`}>
                {' '}
                {valueInTime}{' '}
              </span>
              <p className='money-counter__text'>денег</p>
              <span className='money-counter__sum'>за {second / 10} секнунд</span>
            </div>

            <div className='buttons'>
              <button className='button' onClick={!startButton ? startTimer : stopTimer}>
                {!startButton ? 'Стартуем' : 'Пауза'}
              </button>

              <button className='button' onClick={resetTimer}>
                Обнуление
              </button>
            </div>

            <p className='error__message'>
              {errorMessage && isNaN(valueSalary)
                ? 'Введите корректную ставку перед стартом таймера'
                : errorMessage && valueSalary < 0.1
                ? 'СЛИШКОМ МАЛО'
                : ''}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
