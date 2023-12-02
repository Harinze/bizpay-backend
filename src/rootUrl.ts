const renderHomePage = (): string => {
  return (`
    <div class="bg-green-500 text-white p-8 text-center font-sans">
      <span class="font-bold">Welcome to our Amazing App!</span>
      <br />
      <span role="img" aria-label="rocket">
        🚀
      </span>{' '}
      Ready to experience something extraordinary?{' '}
      <span role="img" aria-label="star">
        🌟
      </span>
    </div>
  `);
};

export { renderHomePage };

