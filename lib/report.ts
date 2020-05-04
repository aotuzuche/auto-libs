const Report = {
  /**
   * 报告一条消息
   * msg: 消息内容
   */
  info(msg: string, extra?: any) {
    if (window && (window as any).Raven) {
      (window as any).Raven.captureMessage(msg, { level: 'info', extra });
    }
  },

  /**
   * 报告一条warning
   * msg: 消息内容
   */
  warning(msg: string, extra?: any) {
    if (window && (window as any).Raven) {
      (window as any).Raven.captureMessage(msg, { level: 'warning', extra });
    }
  },

  /**
   * 报告一条error
   * msg: 消息内容
   */
  error(msg: string | Error, extra?: any) {
    if (window && (window as any).Raven) {
      if (msg instanceof Error) {
        (window as any).Raven.captureException(msg, { extra });
        return;
      }

      (window as any).Raven.captureMessage(msg, { level: 'error', extra });
    }
  },
};

export default Report;
