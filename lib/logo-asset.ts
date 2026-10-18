import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Reads a logo PNG from public/images/logo as a data URL, for use inside
 *  build-time ImageResponse routes (icons, social cards). */
export async function logoDataUrl(
  name: 'logo' | 'logo-light' | 'mark' | 'mark-light',
): Promise<string> {
  const buf = await readFile(join(process.cwd(), 'public/images/logo', `${name}.png`))
  return `data:image/png;base64,${buf.toString('base64')}`
}
