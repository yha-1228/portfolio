import React from 'react';

type DivideProps = {
  children: React.ReactNode[];
  by: React.ReactNode;
};

export default function Divide({ children, by }: DivideProps) {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (index === 0) return child;
        return (
          <>
            {by}
            {child}
          </>
        );
      })}
    </>
  );
}
