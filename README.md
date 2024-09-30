Read the full write

## Gestalt Detector: Simplification via Structural Alignment

Try it yourself: [Gestalt Detector: Simplification via Structural Alignment](https://qri.org/demo/gestalt_detector.html)
(url to be live soon; in the meantime, gestalt_detector.html can be downloaded directly from GitHub and run)

The study of symmetries in 2D projections of 3D lattices provides insight into how transformations can simplify complex informational structures. By applying various projection angles to a 3D lattice of points onto a 2D plane, we observe the emergence of simpler, more symmetrical patterns. As the projection angles align with the lattice structure, intricate patterns simplify, with points overlapping and forming unified gestalts. This simplification process mirrors potential mechanisms of pattern recognition in perceptual systems, where complex inputs are reduced to more manageable, symmetrical forms.

To account for the flexibility of pattern recognition systems and probe the ways in which "moving towards a cessation" interacts with pattern recognition, we introduce a 'near miss' parameter \( \delta \). This parameter allows for the identification of "almost" equilateral triangles in the projected 2D space, where a triangle with side lengths \( a \), \( b \), and \( c \) is considered near-equilateral if \( |a - b| \leq \delta \), \( |b - c| \leq \delta \), and \( |c - a| \leq \delta \). By adjusting \( \delta \), we can explore the balance between precision and pattern recognition, mimicking the perceptual system's ability to identify approximate symmetries. This approach provides a framework for understanding how the brain might extract meaningful structures from structured sensory inputs, mediating between the competing demands of maximizing identified patterns and minimizing perceptual dissonance—a balance that might be drastically altered when approaching a cessation event.

<div class="text-center mb-4">
<img src="/images/image14.png" class="img-fluid" style="width:100%">
<p class="mt-2 text-center">Perfect alignment of projection; imperfect angles</p>

<div class="video-container">
<img src="/images/image13.gif" class="img-fluid">
</div>
<p class="mt-2 text-center">Changing symmetry/structure as angles/near miss parameters shift</p>
</div>

## Standing Wave Pattern Across Multiple Fields: Simplification via standing wave patterns 

Try it yourself: [Standing Wave Pattern Across Multiple Fields: Simplification via standing wave patterns](https://qri.org/demo/standing_waves.html)
(url to be live soon; in the meantime, standing_waves.html can be downloaded directly from GitHub and run)

This simulation was designed to showcase scenarios where wave patterns across different systems of coupled oscillators in different geometric spaces can behave in the same way.

This is implemented through a system of coupled oscillators where the coupling strengths, and the metric to which they apply, can be dynamically adjusted by the user. We start by extending the Coupling Kernels 2D Grid to a 3D lattice. More so, we use "rings" around oscillators to parametrize the Coupling Kernels. And most important of all, we can switch between a distance function in the native 3D space of the lattice and the 2D space of the projection. In other words, we can choose to use the distances between the oscillators either in the lattice or in the screen as the distance function for the Coupling Kernel.

With this toggling between 3D and 2D representations, we simulate the interaction between sensory fields with different intrinsic dimensionalities, such as the visual field (approximated as 2.5D) and the somatic field (3D). This dimensional interplay in the tool allows us to explore how the alignment and synchronization of different sensory modalities might contribute to the emergence of unified attention, potentially leading to experiences of cessation - states of minimal informational content, maximal symmetry, and devoid of internal distinctions. 

#### Mathematical Model

The influence function for both 3D and 2D (projected) cases is defined as:

$$
I(d) = \sum_{i=1}^n [-C_i \cdot R(d, r_i, w_i)]
$$

Where:

- $I(d)$ is the total influence at distance $d$
- $n$ is the number of coupling levels (4 in this implementation)
- $C_i$ is the $i$-th coupling strength (controlled by user interface sliders)
- $r_i = D_i \cdot d_{\text{max}}$, where $D_i$ is the $i$-th characteristic distance
- $w_i = W_i \cdot d_{\text{max}}$, where $W_i$ is the $i$-th ring width
- $R(d, r_i, w_i)$ is the ring function, defined as:

$$
R(d, r, w) = \exp\left[-\frac{(d-r)^2}{2(0.5w)^2}\right] - \exp\left[-\frac{(d-r)^2}{2w^2}\right]
$$

### Dimensionality Interaction

The key innovation in this model is the ability to toggle between 3D and 2D representations, simulating the interaction between sensory fields with different intrinsic dimensionalities (e.g., visual field as 2.5D and somatic field as 3D). This is implemented through different distance calculations:

For 3D:

$$d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$$

$$d_{max} = \sqrt{48} \text{ (assuming a 4x4x4 lattice)}$$

For 2D (projected):

$$d = \sqrt{(\Delta x)^2 + (\Delta y)^2}$$

$$d_{max} = \sqrt{\text{width}^2 + \text{height}^2}$$

The 2D case essentially "flattens" the 3D space onto a plane, ignoring the z-dimension, but still uses a continuous distance measure within that plane.

### Implemenation Details

- The Coupling Kernel is implemented as a continuous function rather than discrete steps (as with "Coupling Kernels 2D Grid").
- Euclidean distance is used instead of Manhattan distance for coupling oscillators.
- A user interface allows dynamic adjustment of coupling strengths and toggling between 2D and 3D representations.

### Interpretation and Implications

Two properties of this stimulation that we hypothesize are related to cessations, and which we showed in interviews:

First, configurations of the tool (i.e. a combination of projections and Coupling Kernel values) where the waves that emerge look the same when we use the 2D or 3D distance function. In particular, the following hexagonal alignment in a state of "global coherence" (i.e. all oscillators are coupled) was a key example of a configuration where it's impossible to tell if the waves are moving in 2D or 3D.

<div class="video-container">
<img src="/images/image2.gif" class="img-fluid">
</div>

And second, when we use the 2D metric, we can create projection-specific and very simple standing wave patterns. For instance, we can align the dots in the lattice in the projection and then get approximately 1D resonant modes, which also move towards the general gradient of simplicity and symmetry, and thus can illustrate the process leading to a cessation.

<div class="video-container">
<img src="/images/image1.gif" class="img-fluid">
</div>

### Configurations

<div class="row mb-4">
<div class="col-md-6 mb-3">
<div class="img-container" style="height: 300px; display: flex; align-items: center; justify-content: center;">
<img src="/images/image5.png" alt="Simplest Configuration - 2D standing wave pattern" class="img-fluid" style="max-height: 100%;">
</div>
<p class="mt-2">This configuration demonstrates a 2D standing wave pattern. The projection is set exactly from the corner to produce a hexagonal appearance.</p>
</div>

<div class="col-md-6 mb-3">
<div class="video-container" style="height: 300px; display: flex; align-items: center; justify-content: center;">
<img src="/images/image9.gif" class="img-fluid" style="max-height: 100%;">
</div>
<p class="mt-2">This configuration is similar to the simplest configuration, but with the "Distance" parameter turned off, resulting in a 3D representation. Coupling 1 varies from -0.3 to 0.5 over 20 seconds, showing the convergence process.</p>
</div>
</div>

<table class="table">
<thead>
<tr>
<th>Parameter</th>
<th>Simplest Configuration (2D)</th>
<th>3D Configuration</th>
</tr>
</thead>
<tbody>
<tr>
<td>Coupling 1</td>
<td>-0.1</td>
<td>-0.3 to 0.5 (20s)</td>
</tr>
<tr>
<td>Coupling 2</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>Coupling 3</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>Coupling 4</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>Auto rotate</td>
<td>no</td>
<td>no</td>
</tr>
<tr>
<td>Rotation Speed</td>
<td>N/A</td>
<td>N/A</td>
</tr>
<tr>
<td>Distance</td>
<td>yes</td>
<td>no</td>
</tr>
<tr>
<td>Projection</td>
<td>Corner (hexagonal)</td>
<td>Corner (hexagonal)</td>
</tr>
</tbody>
</table>

<div class="row mb-4">
<div class="col-md-12 mb-3">
<div class="video-container">
<img src="/images/image3.gif" class="img-fluid">
</div>
<p class="mt-2">This configuration showcases the transition between 2D and 3D representations with parameters exhibiting similar behavior in both dimensions. The aim is to find 2D projections where resonant modes of the simpler (projected) pattern take hold.</p>
</div>
</div>

<div class="row mb-4">
<div class="col-md-12 mb-3">
<div class="video-container">
<img src="/images/image6.gif" class="img-fluid">
</div>
<p class="mt-2">In this configuration, we show how using the distance in the projection we can get waves traveling in lines.</p>
</div>
</div>

<table class="table">
<thead>
<tr>
<th>Parameter</th>
<th>Transition 2D to 3D</th>
</tr>
</thead>
<tbody>
<tr>
<td>Coupling 1</td>
<td>0.1</td>
</tr>
<tr>
<td>Coupling 2</td>
<td>0</td>
</tr>
<tr>
<td>Coupling 3</td>
<td>0</td>
</tr>
<tr>
<td>Coupling 4</td>
<td>0</td>
</tr>
<tr>
<td>Auto rotate</td>
<td>no</td>
</tr>
<tr>
<td>Rotation Speed</td>
<td>N/A</td>
</tr>
<tr>
<td>Distance</td>
<td>yes</td>
</tr>
<tr>
<td>Projection</td>
<td>Square lattice</td>
</tr>
</tbody>
</table>

## Fractal Recursive Coherence: Simplification via Recursion Collapse

Building upon the concept of the world-sheet as an energetic and dynamic system from the [article on DMT geometry](https://qri.org/blog/hyperbolic-geometry-of-dmt), the "Fractal Coherence" simulation illustrates how recursive mappings between the visual and somatic fields can lead to simplification rather than increased complexity. While this model is inspired by the energetic dynamics observed in DMT-induced states, we apply it here to 5-MeO-DMT experiences, where the overall complexity tends to decrease relative to the intensity of the state.

<div class="video-container text-center">
<img src="/images/image7.gif" class="img-fluid">
</div>
<p class="mt-2 text-center">Fractal Recursive Coherence Simulation</p>

The original idea of this simulation was to have multiple projections of the somatic field map onto the visual space and vice versa, creating layers of recursive interaction. Waves traveling through one field can "jump" to other parts of themselves using shortcuts provided by the alternate field. This process can generate complex, yet structured, emergent geometries as the shortest paths between points change in intricate patterns. However, under the influence of 5-MeO-DMT, these recursive interactions lead not to chaos but to convergence.

A cessation experience, in this context, would occur when these projections achieve perfect alignment, causing distinctions between them to collapse. The energy within the world-sheet crystallizes around areas of semantic content or recognized symmetries—acting as energy sinks that reduce complexity and stabilize patterns. This results in a configuration where every possible geodesic—the shortest path between any two points—is identical, and all perspectives converge into a single point of view. Without irregularities or distinctions, the emergent geometry lacks the scaffolding to construct a differentiated world simulation.

Our implementation for this proof of concept ended up being a bit simpler in a number of respects. In particular, we did not implement interaction (other than occlusions) between the projections. Instead, for tractability and simplicity, we opted for: taking a given image, "lifting it" to 3D, and then projecting it back on 2D in a number of different ways. Then, for each level of recursion, we take this output, lift it again, and project it again. The user can choose the number and type of projections as well as the angle of the lift. In essence, this still delivers the intended effect, which is that each "projection of the whole contains a model of the whole within it". And more so, there are ways to have all of these different projections perfectly align and more or less disappear into one another. 

The simulation operates as follows:

- The simulation generates a 2D grating base pattern, with precise control over its characteristics:
- Spatial Frequency X and Y directly determine the pattern's periodicity in each direction
- Global Rotation applies an overall rotation to the entire pattern
- Grating Transparency controls the pattern's opacity
- The Lift Dimension parameter transforms the 2D pattern into a 3D representation, adding depth and perspective to the visualization.
- The Temporal Frequency introduces time-based variation, causing the pattern to evolve dynamically.
- The interface allows for the application of multiple projective transformations
  1. Rotation
  2. Scale
  3. Shear
  4. Translation

Each projection can be individually parameterized, creating a complex composite transformation.

The simulation implements recursion on these projections, with the ability to add or remove recursion levels. Each level applies the set of defined projections to the output of the previous level, creating a number of layers or levels with cross-frequency correlations. It generates the sense of a "collapse" of many points of view into just one. We thought that it captured enough features of Indra's Net and of a fractal simplification process potentially reminiscent of cessations that it was worth including in the study.

Try it yourself: [Fractal Recursive Coherence: Simplification via Recursion Collapse](https://qri.org/demo/fractal_recursive_coherence.html)
(url to be live soon; in the meantime, fractal_recursive_coherence.html can be downloaded directly from GitHub and run)

<div class="video-container">
<img src="/images/image11.gif" class="img-fluid">
</div>
<p class="mt-2 text-center">Exploring the Lift Dimension Parameter</p>

| Parameter | Value |
|-----------|-------|
| Lift Dimension | Ranging through the entire line |
| Global Rotation | All the way to the left |
| Spatial Frequency X | All the way to the left |
| Spatial Frequency Y | Almost all the way to the left |
| Temporal Frequency | 75% |
| Grating Transparency | 25% |
| Toggle Cycle Mode | Off |
| Projection 1 | Rotation - right in the middle |
| Projection 2 | Scale - right in the middle |
| Projection 3 | Shear - right in the middle |
| Projection 4 | Shear |
| Recursion Level | 4 |
