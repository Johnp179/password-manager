export default function Page() {
  return (
    <div className="w-56 h-56 grid grid-rows-4 grid-cols-6 gap-4">
      <header className="col-span-full row-span-1 bg-red-500">01</header>
      <main className="col-span-full row-span-2 ">
        <div className="grid grid-cols-3 gap-3 h-full">
          <aside className="col-span-1 bg-yellow-200"></aside>
          <div className="col-span-2 bg-green-500"></div>
        </div>
      </main>
      <footer className="col-span-full row-span-1  bg-red-500">03</footer>
    </div>
  );
}
