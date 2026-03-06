export const departamentoFullNames: Record<string, string> = {
  DCAYT: 'Departamento de Ciencias Aplicadas y Tecnología',
  DCEYJ: 'Departamento de Ciencias Económicas y Jurídicas',
  DHYCS: 'Departamento de Humanidades y Ciencias Sociales',
}

export function getDepartamentoFullName(departamentoCode: string) {
  const normalizedCode = departamentoCode.trim().toUpperCase()
  return departamentoFullNames[normalizedCode]
}

export function getDepartamentoCode(departamentoFullName: string): string {
  const entry = Object.entries(departamentoFullNames).find(
    ([_, fullName]) => fullName === departamentoFullName
  )
  return entry ? entry[0] : departamentoFullName
}
