function waitForImageElement(img) {
  img.loading = "eager";

  return new Promise(resolve => {
    let finished = false;

    const finish = async () => {
      if (finished) return;

      finished = true;

      img.removeEventListener(
        "load",
        finish
      );

      img.removeEventListener(
        "error",
        finish
      );

      /*
       * load אומר שהקובץ הגיע.
       * decode מחכה גם לכך שהדפדפן
       * יהיה מוכן באמת להציג אותו.
       */
      if (
        img.complete &&
        img.naturalWidth > 0 &&
        typeof img.decode === "function"
      ) {
        try {
          await img.decode();
        } catch {
          // אם decode נכשל,
          // לא נתקע במסך הטעינה.
        }
      }

      resolve();
    };

    img.addEventListener(
      "load",
      finish,
      { once: true }
    );

    img.addEventListener(
      "error",
      finish,
      { once: true }
    );

    /*
     * אם התמונה כבר נמצאת ב-cache,
     * load לא בהכרח יקרה שוב.
     */
    if (img.complete) {
      finish();
    }
  });
}


function preloadImage(url) {
  if (!url) {
    return Promise.resolve();
  }

  /*
   * תמונת base64 כבר נמצאת
   * בתוך הקוד ולא צריך להוריד אותה.
   */
  if (url.startsWith("data:")) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    const image = new Image();

    let finished = false;

    const finish = async () => {
      if (finished) return;

      finished = true;

      image.onload = null;
      image.onerror = null;

      if (
        image.complete &&
        image.naturalWidth > 0 &&
        typeof image.decode === "function"
      ) {
        try {
          await image.decode();
        } catch {
          // לא עוצרים את הלומדה
        }
      }

      resolve();
    };

    image.onload = finish;
    image.onerror = finish;

    image.src = url;

    if (image.complete) {
      finish();
    }
  });
}


function extractUrls(backgroundImage) {
  if (
    !backgroundImage ||
    backgroundImage === "none"
  ) {
    return [];
  }

  const urls = [];

  const regex =
    /url\((['"]?)(.*?)\1\)/g;

  let match;

  while (
    (match =
      regex.exec(backgroundImage)) !== null
  ) {
    urls.push(match[2]);
  }

  return urls;
}


function getBackgroundImages(root) {
  const urls = new Set();

  const elements = [
    root,
    ...root.querySelectorAll("*"),
  ];

  elements.forEach(element => {
    /*
     * לא בודקים תמונות שנמצאות
     * בתוך מסך הטעינה עצמו.
     */
    if (
      element.closest(
        ".loading-screen"
      )
    ) {
      return;
    }

    const styles = [];

    try {
      styles.push(
        window.getComputedStyle(element)
      );

      styles.push(
        window.getComputedStyle(
          element,
          "::before"
        )
      );

      styles.push(
        window.getComputedStyle(
          element,
          "::after"
        )
      );
    } catch {
      return;
    }

    styles.forEach(style => {
      const foundUrls =
        extractUrls(
          style.backgroundImage
        );

      foundUrls.forEach(url => {
        urls.add(url);
      });
    });
  });

  return [...urls];
}


export async function waitForPageAssets(
  root
) {
  if (!root) return;

  /*
   * כל <img> שקיימים כרגע במסך.
   */
  const images = [
    ...root.querySelectorAll("img"),
  ].filter(
    image =>
      !image.closest(
        ".loading-screen"
      )
  );

  /*
   * גם תמונות שהוגדרו דרך CSS:
   *
   * background-image: url(...)
   */
  const backgroundImages =
    getBackgroundImages(root);

  const imagePromises =
    images.map(
      waitForImageElement
    );

  const backgroundPromises =
    backgroundImages.map(
      preloadImage
    );

  /*
   * נחכה גם לפונטים.
   * זה מונע מצב שבו המסך עולה
   * ואז הטקסט משנה גודל.
   */
  const fontsPromise =
    document.fonts?.ready ||
    Promise.resolve();

  await Promise.all([
    ...imagePromises,
    ...backgroundPromises,
    fontsPromise,
  ]);
}