let errorCount = 0;

exports.incrementError = () => {
  errorCount++;
  if (errorCount > 10) {
    console.error("Too many errors, potential SLA breach");
  }
};

exports.getErrorCount = () => errorCount;
