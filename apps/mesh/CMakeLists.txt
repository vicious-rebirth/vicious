#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousMesh)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

#----------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

include(FetchContent)

FetchContent_Declare(
    cgltf
    GIT_REPOSITORY https://github.com/jkuhlmann/cgltf.git
    GIT_TAG v1.15
)
FetchContent_MakeAvailable(cgltf)

FetchContent_Declare(
    linmath
    GIT_REPOSITORY https://github.com/datenwolf/linmath.h.git
    GIT_TAG master
)
FetchContent_MakeAvailable(linmath)

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(msh2gltf
    src/msh2gltf.c
)

target_include_directories(msh2gltf PUBLIC
    ${cgltf_SOURCE_DIR}
    ${linmath_SOURCE_DIR}
)

target_link_libraries(msh2gltf
    m
    vicious
)
