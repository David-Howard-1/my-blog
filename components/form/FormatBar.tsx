'use client';

import { useState, useRef } from 'react';
import FormatButton from './FormatButton';
import { noto_serif } from '@/lib/notoSerif';
import { playfair_dp } from '@/lib/playfairDisplay';
import { BiBold, BiItalic, BiUnderline } from 'react-icons/bi';

type TextFormats = {
  bold: boolean | undefined;
  underline: boolean | undefined;
  italic: boolean | undefined;
  heading: boolean | undefined;
  subheading: boolean | undefined;
};

const FormatBar = () => {
  const [textFormat, setTextFormat] = useState<TextFormats>({
    bold: false,
    underline: false,
    italic: false,
    heading: false,
    subheading: false,
  });

  const updateTextFormat = <K extends keyof TextFormats>(
    property: K,
    value: TextFormats[K]
  ) => {
    setTextFormat((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };


  return (
    <div className="border border-b-0 rounded-md rounded-b-none p-1 px-2.5 flex justify-start space-x-2 items-center">
      <FormatButton
        isActive={textFormat.bold}
        onClick={() => updateTextFormat('bold', !textFormat.bold)}
      >
        <BiBold size={20} />
      </FormatButton>

      <FormatButton
        isActive={textFormat.italic}
        onClick={() => updateTextFormat('italic', !textFormat.italic)}
      >
        <BiItalic size={20} />
      </FormatButton>

      <FormatButton
        isActive={textFormat.underline}
        onClick={() => updateTextFormat('underline', !textFormat.underline)}
      >
        <BiUnderline size={20} />
      </FormatButton>

      <FormatButton
        isActive={textFormat.heading}
        onClick={() => updateTextFormat('heading', !textFormat.heading)}
      >
        <span
          className={`${playfair_dp.className} font-bold px-1 text-2xl text-center`}
        >
          Heading
        </span>
      </FormatButton>

      <FormatButton
        isActive={textFormat.subheading}
        onClick={() => updateTextFormat('subheading', !textFormat.subheading)}
      >
        <span className="font-bold px-1 hover:text-black/70 active:text-black/50 text-lg cursor-pointer text-center">
          Subheading
        </span>
      </FormatButton>
      <FormatButton
        onClick={() => {
          updateTextFormat('heading', false);
          updateTextFormat('subheading', false);
        }}
      >
        <span
          className={`${noto_serif.className} font-semibold px-1 hover:text-black/70 active:text-black/50 cursor-pointer text-center`}
        >
          Normal
        </span>
      </FormatButton>
    </div>
  );
};

export default FormatBar;
