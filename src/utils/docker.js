/**
 * {IP: "0.0.0.0", PrivatePort: 3000, PublicPort: 3001, Type: "tcp"}
 * @param p
 * @returns {string}
 * @constructor
 */
export function PortToStr(p) {
  const pub = (p.IP ? p.IP : '') + (p.PublicPort ? ':' + p.PublicPort : '')
  return (pub ? pub + ' -> ' : '') + p.PrivatePort + '/' + p.Type
}

/**
 * [{IP: "0.0.0.0", PrivatePort: 3000, PublicPort: 3001, Type: "tcp"},…]
 * @param ports
 * @returns {string}
 * @constructor
 */
export function PortsToStr(ports) {
  if (!ports || ports.length === 0) {
    return ''
  }
  let res = ''
  for (const i in ports) {
    const p = ports[i]
    const pub = (p.IP ? p.IP : '') + (p.PublicPort ? ':' + p.PublicPort : '')
    res += ', ' + (pub ? pub + '->' : '') + p.PrivatePort + '/' + p.Type
  }
  return res.substr(1, res.length)
}

export function FormatName(names) {
  return names[0].substr(1, names[0].length - 1)
}

/**
 * [ { "Destination": "/var/lib/mysql", "Mode": "", "Propagation": "rprivate", "RW": true, "Source": "/Users/kdaxrobot/docker/local-mysql", "Type": "bind" },...]
 * @param volumes
 * @constructor
 */
export function FormatVolumes(volumes) {
  if (!volumes || volumes.length === 0) {
    return ''
  }
  const res = []
  for (const i in volumes) {
    const p = volumes[i]
    res.push(p.Source + ' : ' + p.Destination)
  }
  return res
}

export function formatSize(s) {
  if (!s) {
    return ''
  }
  let res = ''
  if (s < 1024) {
    res = s + 'B'
  } else if (s < 1024 * 1024) {
    res = (s / 1024).toFixed(3) + 'KB'
  } else if (s < 1024 * 1024 * 1024) {
    res = (s / (1024 * 1024)).toFixed(3) + 'MB'
  } else {
    res = (s / (1024 * 1024 * 1024)).toFixed(3) + 'GB'
  }
  return res
}

export function formatMemory(m) {
  if (!m || !m.usage) {
    return ''
  }
  return formatSize(m.usage) + ' / ' + formatSize(m.limit)
}

export function formatMemory2(m) {
  if (!m || !m.usage) {
    return ''
  }
  return (m.usage * 100.0 / m.limit).toFixed(2) + '%'
}

export function formatCpu(c) {
  if (!c || !c.cpu_usage) {
    return ''
  }
  let cpuPercent = 0.0
  const previousCPU = 0
  const previousSystem = 0
  // calculate the change for the cpu usage of the container in between readings
  const cpuDelta = c.cpu_usage.total_usage - previousCPU
  // calculate the change for the entire system between readings
  const systemDelta = c.system_cpu_usage - previousSystem

  if (systemDelta > 0.0 && cpuDelta > 0.0) {
    cpuPercent = (cpuDelta / systemDelta) * c.cpu_usage.percpu_usage.length * 100.0
  }
  return cpuPercent.toFixed(2) + '%'
}

export function formatNet(n) {
  if (!n || !n.eth0) {
    return ''
  }
  /**
   * { "eth0": { "rx_bytes": 2336, "rx_dropped": 0, "rx_errors": 0, "rx_packets": 32, "tx_bytes": 0, "tx_dropped": 0, "tx_errors": 0, "tx_packets": 0 } }
   */
  const e = n.eth0
  return formatSize(e.rx_bytes) + ' / ' + formatSize(e.tx_bytes)
}
