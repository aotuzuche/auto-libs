const analyticsReport = (ok: boolean, type: string, data: any) => {
  if (!ok) {
    return;
  }
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/apigateway/webAnalytics/public/' + type, JSON.stringify(data));
  } else if (window.fetch) {
    window
      .fetch('/apigateway/webAnalytics/public/' + type, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      })
      .catch(() => {});
  }
};

export default analyticsReport;
