import React from 'react'

type Props = {
    children: React.ReactNode;
    className?: string;
}

const CustomFilter = ({children, className}: Props) => {
  return (
    <section className={`px-14 py-10 flex gap-x-5 ${className}`}>
        {children}
    </section>
  )
}

export default CustomFilter