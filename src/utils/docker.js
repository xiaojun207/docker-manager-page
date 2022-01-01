export function ContainerShortId(containerId) {
  return containerId.substr(0, 12)
}

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

/**
 To calculate the values shown by the `stats` command of the docker cli tool
 the following formulas can be used:
 * used_memory = `memory_stats.usage - memory_stats.stats.cache`
 * available_memory = `memory_stats.limit`
 * Memory usage % = `(used_memory / available_memory) * 100.0`
 * cpu_delta = `cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage`
 * system_cpu_delta = `cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage`
 * number_cpus = `lenght(cpu_stats.cpu_usage.percpu_usage)` or `cpu_stats.online_cpus`
 * CPU usage % = `(cpu_delta / system_cpu_delta) * number_cpus * 100.0`
 * @param c
 * @returns {string}
 */
export function formatCpu(cpu_stats, precpu_stats) {
  // https://my.oschina.net/jxcdwangtao/blog/828648
  // cpu_delta = cpu_total_usage - pre_cpu_total_usage;
  // system_delta = system_usage - pre_system_usage;
  // CPU % = ((cpu_delta / system_delta) * length(per_cpu_usage_array) ) * 100.0

  if (!cpu_stats || !cpu_stats.cpu_usage || !precpu_stats || !precpu_stats.cpu_usage || !cpu_stats.system_cpu_usage || !precpu_stats.system_cpu_usage) {
    return '0%'
  }
  const cpu_delta = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage
  const system_cpu_delta = cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage
  const number_cpus = cpu_stats.online_cpus
  const cpu_usage_percent = (cpu_delta / system_cpu_delta) * number_cpus * 100.0
  return cpu_usage_percent.toFixed(2) + '%'
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
