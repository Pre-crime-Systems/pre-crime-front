import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import cx from 'classnames';
import './multiRangeSlider.scss';

interface MultiRangeSliderProps {
  className?: string;
  label?: string;
  max: number;
  min: number;
  onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = (
  props: MultiRangeSliderProps
) => {
  const { className, label, max, min, onChange } = props;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const minLimitVal = 0;
  const maxLimitVal = 23;

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - minLimitVal) / (maxLimitVal - minLimitVal)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <section className={cx('multiRangeSlider', className && className)}>
      {label && <label className="multiRangeSlider__label">{label}</label>}
      <div className="multiRangeSlider__content">
        <input
          type="range"
          min={minLimitVal}
          max={maxLimitVal}
          value={minVal}
          ref={minValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={cx('thumb thumb--zindex-3', {
            'thumb--zindex-5': minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={minLimitVal}
          max={maxLimitVal}
          value={maxVal}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />
        <div className="slider">
          <div className="slider__track"></div>
          <div ref={range} className="slider__range"></div>
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
    </section>
  );
};

export default MultiRangeSlider;
