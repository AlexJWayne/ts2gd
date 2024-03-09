
/**
 * The [LightmapGI] node is used to compute and store baked lightmaps. Lightmaps are used to provide high-quality indirect lighting with very little light leaking. [LightmapGI] can also provide rough reflections using spherical harmonics if [member directional] is enabled. Dynamic objects can receive indirect lighting thanks to **light probes**, which can be automatically placed by setting [member generate_probes_subdiv] to a value other than [constant GENERATE_PROBES_DISABLED]. Additional lightmap probes can also be added by creating [LightmapProbe] nodes. The downside is that lightmaps are fully static and cannot be baked in an exported project. Baking a [LightmapGI] node is also slower compared to [VoxelGI].
 *
 * **Procedural generation:** Lightmap baking functionality is only available in the editor. This means [LightmapGI] is not suited to procedurally generated or user-built levels. For procedurally generated or user-built levels, use [VoxelGI] or SDFGI instead (see [member Environment.sdfgi_enabled]).
 *
 * **Performance:** [LightmapGI] provides the best possible run-time performance for global illumination. It is suitable for low-end hardware including integrated graphics and mobile devices.
 *
 * **Note:** Due to how lightmaps work, most properties only have a visible effect once lightmaps are baked again.
 *
 * **Note:** Lightmap baking on [CSGShape3D]s and [PrimitiveMesh]es is not supported, as these cannot store UV2 data required for baking.
 *
 * **Note:** If no custom lightmappers are installed, [LightmapGI] can only be baked when using the Vulkan backend (Forward+ or Mobile), not OpenGL.
 *
*/
declare class LightmapGI extends VisualInstance3D  {

  
/**
 * The [LightmapGI] node is used to compute and store baked lightmaps. Lightmaps are used to provide high-quality indirect lighting with very little light leaking. [LightmapGI] can also provide rough reflections using spherical harmonics if [member directional] is enabled. Dynamic objects can receive indirect lighting thanks to **light probes**, which can be automatically placed by setting [member generate_probes_subdiv] to a value other than [constant GENERATE_PROBES_DISABLED]. Additional lightmap probes can also be added by creating [LightmapProbe] nodes. The downside is that lightmaps are fully static and cannot be baked in an exported project. Baking a [LightmapGI] node is also slower compared to [VoxelGI].
 *
 * **Procedural generation:** Lightmap baking functionality is only available in the editor. This means [LightmapGI] is not suited to procedurally generated or user-built levels. For procedurally generated or user-built levels, use [VoxelGI] or SDFGI instead (see [member Environment.sdfgi_enabled]).
 *
 * **Performance:** [LightmapGI] provides the best possible run-time performance for global illumination. It is suitable for low-end hardware including integrated graphics and mobile devices.
 *
 * **Note:** Due to how lightmaps work, most properties only have a visible effect once lightmaps are baked again.
 *
 * **Note:** Lightmap baking on [CSGShape3D]s and [PrimitiveMesh]es is not supported, as these cannot store UV2 data required for baking.
 *
 * **Note:** If no custom lightmappers are installed, [LightmapGI] can only be baked when using the Vulkan backend (Forward+ or Mobile), not OpenGL.
 *
*/
  new(): LightmapGI; 
  static "new"(): LightmapGI 


/** The bias to use when computing shadows. Increasing [member bias] can fix shadow acne on the resulting baked lightmap, but can introduce peter-panning (shadows not connecting to their casters). Real-time [Light3D] shadows are not affected by this [member bias] property. */
bias: float;

/**
 * The energy multiplier for each bounce. Higher values will make indirect lighting brighter. A value of `1.0` represents physically accurate behavior, but higher values can be used to make indirect lighting propagate more visibly when using a low number of bounces. This can be used to speed up bake times by lowering the number of [member bounces] then increasing [member bounce_indirect_energy].
 *
 * **Note:** [member bounce_indirect_energy] only has an effect if [member bounces] is set to a value greater than or equal to `1`.
 *
*/
bounce_indirect_energy: float;

/** Number of light bounces that are taken into account during baking. Higher values result in brighter, more realistic lighting, at the cost of longer bake times. If set to [code]0[/code], only environment lighting, direct light and emissive lighting is baked. */
bounces: int;

/** The [CameraAttributes] resource that specifies exposure levels to bake at. Auto-exposure and non exposure properties will be ignored. Exposure settings should be used to reduce the dynamic range present when baking. If exposure is too high, the [LightmapGI] will have banding artifacts or may have over-exposure artifacts. */
camera_attributes: CameraAttributes;

/** The strength of denoising step applied to the generated lightmaps. Only effective if [member use_denoiser] is [code]true[/code] and [member ProjectSettings.rendering/lightmapping/denoising/denoiser] is set to JNLM. */
denoiser_strength: float;

/**
 * If `true`, bakes lightmaps to contain directional information as spherical harmonics. This results in more realistic lighting appearance, especially with normal mapped materials and for lights that have their direct light baked ([member Light3D.light_bake_mode] set to [constant Light3D.BAKE_STATIC] and with [member Light3D.editor_only] set to `false`). The directional information is also used to provide rough reflections for static and dynamic objects. This has a small run-time performance cost as the shader has to perform more work to interpret the direction information from the lightmap. Directional lightmaps also take longer to bake and result in larger file sizes.
 *
 * **Note:** The property's name has no relationship with [DirectionalLight3D]. [member directional] works with all light types.
 *
*/
directional: boolean;

/** The color to use for environment lighting. Only effective if [member environment_mode] is [constant ENVIRONMENT_MODE_CUSTOM_COLOR]. */
environment_custom_color: Color;

/** The color multiplier to use for environment lighting. Only effective if [member environment_mode] is [constant ENVIRONMENT_MODE_CUSTOM_COLOR]. */
environment_custom_energy: float;

/** The sky to use as a source of environment lighting. Only effective if [member environment_mode] is [constant ENVIRONMENT_MODE_CUSTOM_SKY]. */
environment_custom_sky: Sky;

/** The environment mode to use when baking lightmaps. */
environment_mode: int;

/**
 * The level of subdivision to use when automatically generating [LightmapProbe]s for dynamic object lighting. Higher values result in more accurate indirect lighting on dynamic objects, at the cost of longer bake times and larger file sizes.
 *
 * **Note:** Automatically generated [LightmapProbe]s are not visible as nodes in the Scene tree dock, and cannot be modified this way after they are generated.
 *
 * **Note:** Regardless of [member generate_probes_subdiv], direct lighting on dynamic objects is always applied using [Light3D] nodes in real-time.
 *
*/
generate_probes_subdiv: int;

/** If [code]true[/code], ignore environment lighting when baking lightmaps. */
interior: boolean;

/** The [LightmapGIData] associated to this [LightmapGI] node. This resource is automatically created after baking, and is not meant to be created manually. */
light_data: LightmapGIData;

/** The maximum texture size for the generated texture atlas. Higher values will result in fewer slices being generated, but may not work on all hardware as a result of hardware limitations on texture sizes. Leave [member max_texture_size] at its default value of [code]16384[/code] if unsure. */
max_texture_size: int;

/**
 * The quality preset to use when baking lightmaps. This affects bake times, but output file sizes remain mostly identical across quality levels.
 *
 * To further speed up bake times, decrease [member bounces], disable [member use_denoiser] and increase the lightmap texel size on 3D scenes in the Import doc.
 *
*/
quality: int;

/** If [code]true[/code], uses a GPU-based denoising algorithm on the generated lightmap. This eliminates most noise within the generated lightmap at the cost of longer bake times. File sizes are generally not impacted significantly by the use of a denoiser, although lossless compression may do a better job at compressing a denoised image. */
use_denoiser: boolean;

/**
 * If `true`, a texture with the lighting information will be generated to speed up the generation of indirect lighting at the cost of some accuracy. The geometry might exhibit extra light leak artifacts when using low resolution lightmaps or UVs that stretch the lightmap significantly across surfaces. Leave [member use_texture_for_bounces] at its default value of `true` if unsure.
 *
 * **Note:** [member use_texture_for_bounces] only has an effect if [member bounces] is set to a value greater than or equal to `1`.
 *
*/
use_texture_for_bounces: boolean;



  connect<T extends SignalsOf<LightmapGI>>(signal: T, method: SignalFunction<LightmapGI[T]>): number;



/**
 * Low bake quality (fastest bake times). The quality of this preset can be adjusted by changing [member ProjectSettings.rendering/lightmapping/bake_quality/low_quality_ray_count] and [member ProjectSettings.rendering/lightmapping/bake_quality/low_quality_probe_ray_count].
 *
*/
static BAKE_QUALITY_LOW: any;

/**
 * Medium bake quality (fast bake times). The quality of this preset can be adjusted by changing [member ProjectSettings.rendering/lightmapping/bake_quality/medium_quality_ray_count] and [member ProjectSettings.rendering/lightmapping/bake_quality/medium_quality_probe_ray_count].
 *
*/
static BAKE_QUALITY_MEDIUM: any;

/**
 * High bake quality (slow bake times). The quality of this preset can be adjusted by changing [member ProjectSettings.rendering/lightmapping/bake_quality/high_quality_ray_count] and [member ProjectSettings.rendering/lightmapping/bake_quality/high_quality_probe_ray_count].
 *
*/
static BAKE_QUALITY_HIGH: any;

/**
 * Highest bake quality (slowest bake times). The quality of this preset can be adjusted by changing [member ProjectSettings.rendering/lightmapping/bake_quality/ultra_quality_ray_count] and [member ProjectSettings.rendering/lightmapping/bake_quality/ultra_quality_probe_ray_count].
 *
*/
static BAKE_QUALITY_ULTRA: any;

/**
 * Don't generate lightmap probes for lighting dynamic objects.
 *
*/
static GENERATE_PROBES_DISABLED: any;

/**
 * Lowest level of subdivision (fastest bake times, smallest file sizes).
 *
*/
static GENERATE_PROBES_SUBDIV_4: any;

/**
 * Low level of subdivision (fast bake times, small file sizes).
 *
*/
static GENERATE_PROBES_SUBDIV_8: any;

/**
 * High level of subdivision (slow bake times, large file sizes).
 *
*/
static GENERATE_PROBES_SUBDIV_16: any;

/**
 * Highest level of subdivision (slowest bake times, largest file sizes).
 *
*/
static GENERATE_PROBES_SUBDIV_32: any;

/**
 * Lightmap baking was successful.
 *
*/
static BAKE_ERROR_OK: any;

/**
 * Lightmap baking failed because the root node for the edited scene could not be accessed.
 *
*/
static BAKE_ERROR_NO_SCENE_ROOT: any;

/**
 * Lightmap baking failed as the lightmap data resource is embedded in a foreign resource.
 *
*/
static BAKE_ERROR_FOREIGN_DATA: any;

/**
 * Lightmap baking failed as there is no lightmapper available in this Godot build.
 *
*/
static BAKE_ERROR_NO_LIGHTMAPPER: any;

/**
 * Lightmap baking failed as the [LightmapGIData] save path isn't configured in the resource.
 *
*/
static BAKE_ERROR_NO_SAVE_PATH: any;

/**
 * Lightmap baking failed as there are no meshes whose [member GeometryInstance3D.gi_mode] is [constant GeometryInstance3D.GI_MODE_STATIC] and with valid UV2 mapping in the current scene. You may need to select 3D scenes in the Import dock and change their global illumination mode accordingly.
 *
*/
static BAKE_ERROR_NO_MESHES: any;

/**
 * Lightmap baking failed as the lightmapper failed to analyze some of the meshes marked as static for baking.
 *
*/
static BAKE_ERROR_MESHES_INVALID: any;

/**
 * Lightmap baking failed as the resulting image couldn't be saved or imported by Godot after it was saved.
 *
*/
static BAKE_ERROR_CANT_CREATE_IMAGE: any;

/**
 * The user aborted the lightmap baking operation (typically by clicking the **Cancel** button in the progress dialog).
 *
*/
static BAKE_ERROR_USER_ABORTED: any;

/**
 * Lightmap baking failed as the maximum texture size is too small to fit some of the meshes marked for baking.
 *
*/
static BAKE_ERROR_TEXTURE_SIZE_TOO_SMALL: any;

/**
 * Ignore environment lighting when baking lightmaps.
 *
*/
static ENVIRONMENT_MODE_DISABLED: any;

/**
 * Use the scene's environment lighting when baking lightmaps.
 *
 * **Note:** If baking lightmaps in a scene with no [WorldEnvironment] node, this will act like [constant ENVIRONMENT_MODE_DISABLED]. The editor's preview sky and sun is **not** taken into account by [LightmapGI] when baking lightmaps.
 *
*/
static ENVIRONMENT_MODE_SCENE: any;

/**
 * Use [member environment_custom_sky] as a source of environment lighting when baking lightmaps.
 *
*/
static ENVIRONMENT_MODE_CUSTOM_SKY: any;

/**
 * Use [member environment_custom_color] multiplied by [member environment_custom_energy] as a constant source of environment lighting when baking lightmaps.
 *
*/
static ENVIRONMENT_MODE_CUSTOM_COLOR: any;



}

