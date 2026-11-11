'use client';
export default function ErrorPage({reset}:{reset:()=>void}) { return <section className="container empty-page"><p className="eyebrow">LET’S TRY THAT AGAIN</p><h1>Something interrupted this page.</h1><p>Please try again in a moment.</p><button className="button" onClick={reset}>Try again</button></section>; }
