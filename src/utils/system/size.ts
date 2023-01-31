


export function formatSize(s:any )  {
    const b = s
    const kb = s / (1024)
   const mb = s / (1024 * 1024)
   const gb = s / (1024 * 1024 * 1024)
    if (gb > 0.1) {
        return gb.toFixed(4) + "GB"
    } else if (mb > 0.1) {
        return mb.toFixed(4) + "MB"
    } else if (kb > 0.1) {
        return kb.toFixed(4) + "KB"
    } else {
        return b.toFixed(4) + "b"
    }
}
