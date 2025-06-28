export default function GridShape() {
  return (
    <>
      <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
        {/* Light mode image */}
        <img src="/images/shape/grid-01.svg" alt="grid" className="block dark:hidden" />
        {/* Dark mode image */}
        <img src="/images/shape/grid-01.svg" alt="grid" className="hidden dark:block" />
      </div>

      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <img src="/images/shape/grid-01.svg" alt="grid" className="block dark:hidden" />
        <img src="/images/shape/grid-01.svg" alt="grid" className="hidden dark:block" />
      </div>
    </>
  )
}
